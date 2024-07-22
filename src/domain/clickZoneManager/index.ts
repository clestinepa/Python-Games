import { ThunkDispatch } from "@reduxjs/toolkit";
import { Board, Level } from "../../models/game";
import { updateZone } from "../../redux/slices/game";
import { ActionState } from "../../redux/slices/action";

interface Execution {
  nb_line: number;
  nb_column: number;
  action: ActionState;
  board: Board;
  level: Level;
  dispatch: ThunkDispatch<any, undefined, any>;
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

const ClickZoneManager = {
  _lastExecution: 0,
  _queueExecution: new QueueExecution(),
  _timeWait: 30,
  _intervalId: null as NodeJS.Timer | null,

  startProcessingQueueExecution: () => {
    ClickZoneManager._intervalId = setInterval(() => {
      ClickZoneManager._processQueueExecution();
    }, ClickZoneManager._timeWait);
  },

  stopProcessingQueueExecution: () => {
    clearInterval(ClickZoneManager._intervalId!);
    ClickZoneManager._intervalId = null;
  },

  handleClick: (param: Execution) => {
    let isEmptyAction = false;

    // if we wait enough after the last execution
    if (Date.now() - ClickZoneManager._lastExecution >= ClickZoneManager._timeWait) {
      if (ClickZoneManager._queueExecution.isEmpty()) {
        //if there is no queue => execute now
        isEmptyAction = ClickZoneManager._clickZone(param).isEmptyAction;
        ClickZoneManager._lastExecution = Date.now();
      } else {
        //if some execution are waiting => this one also wait
        ClickZoneManager._queueExecution.enqueue(param);
      }
    } else {
      if (ClickZoneManager._intervalId === null) {
        ClickZoneManager.startProcessingQueueExecution();
      }
      ClickZoneManager._queueExecution.enqueue(param);
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
    }

    if (modifiedInPurpose) {
      execution.setIsModifiedInPurposeState(true);
      execution.dispatch(updateZone({ nb_line: execution.nb_line, nb_column: execution.nb_column, new_zone }));
    }

    return { isEmptyAction: new_action.onEmpty === true, modifiedInPurpose: modifiedInPurpose };
  },

  _processQueueExecution: () => {
    if (!ClickZoneManager._queueExecution.isEmpty()) {
      let modifiedInPurpose = false;
      //ignore if the click do nothing
      while (!modifiedInPurpose && !ClickZoneManager._queueExecution.isEmpty()) {
        let execution = ClickZoneManager._queueExecution.dequeue();
        modifiedInPurpose = ClickZoneManager._clickZone(execution!).modifiedInPurpose;
      }
      ClickZoneManager._lastExecution = Date.now();
    }

    if (ClickZoneManager._queueExecution.isEmpty()) {
      ClickZoneManager.stopProcessingQueueExecution();
    }
  },
};

export default ClickZoneManager;
