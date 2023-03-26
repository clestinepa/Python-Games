import { Action, Board, Level } from "../../interfaces/LevelSource";

interface Execution {
  nb_line: number;
  nb_column: number;
  action: Action;
  board: Board;
  level: Level;
}

interface ResultClickZone {
  new_action : Action ;
  new_zone : number;
  modifiedInPurpose : boolean;
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
  _lastExecution: null as number | null,
  _queueExecution: new QueueExecution(),
  _timeWait : 100,

  handleClick : (param: Execution) => {
    let result : ResultClickZone = {
      new_action : param.action,
      new_zone : param.board.currentBoard[param.nb_line][param.nb_column],
      modifiedInPurpose : false,
    }
  

    // Vérifier si la dernière exécution est à plus de 100 millisecondes
    if (ClickZoneManagement._lastExecution === null || Date.now() - ClickZoneManagement._lastExecution >= ClickZoneManagement._timeWait) {
      result = ClickZoneManagement._clickZone(param)
      ClickZoneManagement._lastExecution = Date.now();
    } else {
      ClickZoneManagement._queueExecution.enqueue(param)
        console.log("CALM DOWN")
    }

    return result;
  },

  _clickZone : (param : Execution) => {
    let new_result : ResultClickZone = {
      new_action : param.action,
      new_zone : param.board.currentBoard[param.nb_line][param.nb_column],
      modifiedInPurpose : false,
    }
    
    if (new_result.new_action.onFill) {
      if (new_result.new_zone === 1) {
        //if already fill
        if (!new_result.new_action.onAction) {
          //only the first zone define if its an empty action or not
          new_result.new_action = { ...new_result.new_action, onEmpty: true };
        }
        if (new_result.new_action.onEmpty) {
          new_result.new_zone = 0;
        }
      } else {
        if (!new_result.new_action.onEmpty) {
          new_result.new_zone = 1;
        }
      }
    } else if (new_result.new_action.onCross) {
      if (new_result.new_zone === 2) {
        //if already cross
        if (!new_result.new_action.onAction) {
          //only the first zone define if its an empty action or not
          new_result.new_action = { ...new_result.new_action, onEmpty: true };
        }
        if (new_result.new_action.onEmpty) {
          new_result.new_zone = 0;
        }
      } else {
        if (!new_result.new_action.onEmpty) {
          new_result.new_zone = 2;
        }
      }
    }
    if (new_result.new_zone !== param.board.currentBoard[param.nb_line][param.nb_column] && param.board.currentFill < param.level.nb_fill) {
      new_result.modifiedInPurpose = true;
      console.log("modified in purpose", param.nb_line, param.nb_column);
    }

    return new_result;
  },

  _processQueueExecution : () => {
    while (!ClickZoneManagement._queueExecution.isEmpty()) {
      let execution = ClickZoneManagement._queueExecution.dequeue();
      ClickZoneManagement._clickZone(execution!)
    }
  },
};

export default ClickZoneManagement;
