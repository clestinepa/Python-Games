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
  setIsModifiedInPurposeState: React.Dispatch<React.SetStateAction<boolean>>;
}

class QueueExecution {
  public executions: Execution[] = [];

  public enqueue(execution: Execution) {
    this.executions.push(execution);
  }

  public dequeue(): Execution | undefined {
    const execution = this.executions.shift();
    return execution;
  }

  public isEmpty(): boolean {
    return this.executions.length === 0;
  }
}

const ClickZoneManagement = {
  _lastExecution: 0,
  _queueExecution: new QueueExecution(),
  _timeWait: 50,
  _intervalId: null as NodeJS.Timer | null,

  startProcessingQueueExecution: () => {
    ClickZoneManagement._intervalId = setInterval(() => {
      ClickZoneManagement._processQueueExecution();
    }, ClickZoneManagement._timeWait);
    console.log("START", ClickZoneManagement._intervalId);
  },

  stopProcessingQueueExecution: () => {
    console.log("STOP", ClickZoneManagement._intervalId);
    clearInterval(ClickZoneManagement._intervalId!);
    ClickZoneManagement._intervalId = null;
  },

  handleClick: (param: Execution) => {
    let isEmptyAction = false;

    // if we wait enough after the last execution
    if (Date.now() - ClickZoneManagement._lastExecution >= ClickZoneManagement._timeWait) {
      if (ClickZoneManagement._queueExecution.isEmpty()) {
        //if there is no queue => execute now
        // console.log("GO", param.nb_line, param.nb_column);
        isEmptyAction = ClickZoneManagement._clickZone(param);
        ClickZoneManagement._lastExecution = Date.now();
      } else {
        //if some execution are waiting => this one also wait
        // console.log("YOU WAIT", param.nb_line, param.nb_column);
        ClickZoneManagement._queueExecution.enqueue(param);
      }
    } else {
      if (ClickZoneManagement._intervalId === null) {
        console.log("START", param.nb_line, param.nb_column);
        ClickZoneManagement.startProcessingQueueExecution();
      }

      // console.log("CALM DOWN", param.nb_line, param.nb_column);
      ClickZoneManagement._queueExecution.enqueue(param);
    }

    return isEmptyAction;
  },

  _clickZone: (execution: Execution) => {
    let new_action = execution.action;
    let modifiedInPurpose = false;
    let new_zone = execution.board.currentBoard[execution.nb_line][execution.nb_column];
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
    if (new_zone !== execution.board.currentBoard[execution.nb_line][execution.nb_column] && execution.board.currentFill < execution.level.nb_fill) {
      modifiedInPurpose = true;
      // console.log("modified in purpose", execution.nb_line, execution.nb_column);
    }

    if (modifiedInPurpose) {
      execution.setIsModifiedInPurposeState(true);
    }
    execution.dispatch(updateZone(execution.nb_line, execution.nb_column, new_zone));

    return new_action.onEmpty === true;
  },

  _processQueueExecution: () => {
    if (!ClickZoneManagement._queueExecution.isEmpty()) {
      // console.log("execution !");
      let execution = ClickZoneManagement._queueExecution.dequeue();
      let new_action = ClickZoneManagement._clickZone(execution!);
      ClickZoneManagement._lastExecution = Date.now();
      //je sais pas si je dois dispatch ce new_action
    } else {
      console.log("plus d'execution en attente");
    }

    if (ClickZoneManagement._queueExecution.isEmpty()) {
      ClickZoneManagement.stopProcessingQueueExecution();
    }
  },

  displayQueue: () => {
    for (let execution of ClickZoneManagement._queueExecution.executions) {
      console.log(execution);
    }
  },
};

export default ClickZoneManagement;
