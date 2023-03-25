import { Action, Board, Level } from "../../interfaces/LevelSource";

const ClickZone = {
  _lastExecution: new Date().getTime(),
  _queueExecution: [],
  _timeWait : 100,

  clickZone: (nb_line: number, nb_column: number, action: Action, board: Board, level: Level) => {
    let new_action = action;
    let new_zone = board.currentBoard[nb_line][nb_column];
    let modifiedInPurpose = false;
    let execution = new Date().getTime();
    console.log(execution, ClickZone._lastExecution, execution - ClickZone._lastExecution)
    if (execution - ClickZone._lastExecution >= ClickZone._timeWait) {
        console.log("nouvelle execution")
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
      if (new_zone !== board.currentBoard[nb_line][nb_column] && board.currentFill < level.nb_fill) {
        modifiedInPurpose = true;
        console.log("modified in purpose", nb_line, nb_column);
      }

      ClickZone._lastExecution = execution;
    } else {
        console.log("CALM DOWN")
    }

    return { new_action, new_zone, modifiedInPurpose };
  },
};

export default ClickZone;
