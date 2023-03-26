import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Action, Board, Level } from "../../interfaces/LevelSource";
import { updateZone } from "../../redux";

interface Execution {
  nb_line: number;
  nb_column: number;
  action: Action;
  board: Board;
  level: Level;
  dispatch: ThunkDispatch<any, undefined, AnyAction>;
  setIsModifiedInPurposeState :React.Dispatch<React.SetStateAction<boolean>>;
}

class QueueExecution {
  private head: number = 0;
  private tail: number = 0;
  private executions: Execution[] = [];

  public enqueue(execution: Execution) {
    this.executions[this.tail] = execution;
    this.tail++;
  }

  public dequeue(): Execution | undefined {
    if (this.head === this.tail) {
      return undefined; // queue is empty
    }
    const execution = this.executions[this.head];
    this.head++;
    return execution;
  }

  public isEmpty(): boolean {
    return this.head === this.tail;
  }
}

const ClickZoneManagement = {
  _lastExecution: 0,
  _queueExecution: new QueueExecution(),
  _timeWait: 100,

  handleClick: (param: Execution) => {
    let new_action= param.action;

    // if we wait enough after the last execution
    if (Date.now() - ClickZoneManagement._lastExecution >= ClickZoneManagement._timeWait) {
      if (ClickZoneManagement._queueExecution.isEmpty()) {
        //if there is no queue => execute now
        console.log("GO", param.nb_line, param.nb_column)
        new_action = ClickZoneManagement._clickZone(param);
        ClickZoneManagement._lastExecution = Date.now();
      } else {
        //if some execution are waiting => this one also wait
        console.log("YOU WAIT", param.nb_line, param.nb_column)
        ClickZoneManagement._queueExecution.enqueue(param);
        //execute the one waiting first
        let execution = ClickZoneManagement._queueExecution.dequeue();
        new_action = ClickZoneManagement._clickZone(execution!);
      }
    } else {
      console.log("CALM DOWN", param.nb_line, param.nb_column);
      ClickZoneManagement._queueExecution.enqueue(param);

    }

    return new_action;
  },

  _clickZone: (param: Execution) => {
    let new_action= param.action;
    let modifiedInPurpose= false;
    let new_zone = param.board.currentBoard[param.nb_line][param.nb_column];

    if (new_action.onFill) {
      if (new_zone === 1) {
        //if already fill
        if (!new_action.onAction) {
          //only the first zone define if its an empty action or not
          new_action = { ...new_action, onEmpty: true };
        }
        if (new_action.onEmpty) {
          new_zone = 0;
        }
      } else {
        if (!new_action.onEmpty) {
          new_zone = 1;
        }
      }
    } else if (new_action.onCross) {
      if (new_zone === 2) {
        //if already cross
        if (!new_action.onAction) {
          //only the first zone define if its an empty action or not
          new_action = { ...new_action, onEmpty: true };
        }
        if (new_action.onEmpty) {
          new_zone = 0;
        }
      } else {
        if (!new_action.onEmpty) {
          new_zone = 2;
        }
      }
    }
    if (new_zone !== param.board.currentBoard[param.nb_line][param.nb_column] && param.board.currentFill < param.level.nb_fill) {
      modifiedInPurpose = true;
      console.log("modified in purpose", param.nb_line, param.nb_column);
    }

    if (modifiedInPurpose) {
      param.setIsModifiedInPurposeState(true);
    }
    param.dispatch(updateZone(param.nb_line, param.nb_column, new_zone));

    return new_action;
  },

  _processQueueExecution: () => {
    while (!ClickZoneManagement._queueExecution.isEmpty()) {
      let execution = ClickZoneManagement._queueExecution.dequeue();
      ClickZoneManagement._clickZone(execution!);
    }
  },
};

export default ClickZoneManagement;
