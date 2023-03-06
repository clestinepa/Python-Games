const board = document.getElementById("board");
const clues_columns = document.getElementById("clues_columns");
const clues_lines = document.getElementById("clues_lines");


/** Detail des éléments
 * ZONE : id=line_.._column_..
 *      * zone
 *      * zone_fill / zone_empty / zone_cross
 *      * line_..
 *      * column_..
 *      * [border_right]
 * 
 * CLUES_LINE : id=line_..
 *      * clues_line
 *      * clues_ERROR / clues_done / clues_normal
 * 
 * CLUES_COLUMNS : id=column_..
 *      * clues_column
 *      * clues_ERROR / clues_done / clues_normal
 * 
 * CLUE : id=
 *      * clue
 *      * clue_ERROR / clue_done / clue_normal
 */

const level = {
  name: "test",
  difficulty: 1,
  size: 10,
  clues: {
    column: [[1], [3, 2], [5, 3], [2, 5], [1, 4], [1, 4], [2, 5], [5, 3], [3, 2], [1]],
    line: [[4], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [4], [6], [8], [10]]
  }
}

const action = {
  onaction: false,
  fill: true,
  cross: false,
  empty: false
};

/**0 means empty, 1 means fill, 2 means cross */
var currentBoard = []

/**Initialize to 0 all the cell in currentBoard */
function initializeCurrentBoard(level) {
  for (let i = 0; i < level.size; i++) {
    let line = []
    for (let j = 0; j < level.size; j++) {
      line.push(0)
    }
    currentBoard.push(line)
  }
}

/**Create  the game board with the right number of zones and all the clues*/
function createBoard(level) {
  for (let nb_line = 0; nb_line < level.size; nb_line++) {
    newClueLine(level, nb_line);
    let line = document.createElement("li");
    for (let nb_column = 0; nb_column < level.size; nb_column++) {
      if (nb_line == 0) {
        newClueColumn(level, nb_column);
      }
      let zone = newZone(nb_line, nb_column);
      if ((nb_column + 1) % 5 == 0 && nb_column + 1 != level.size) {
        zone.classList.add("border_right");
      }
      line.appendChild(zone);
    }
    if ((nb_line + 1) % 5 == 0 && nb_line + 1 != level.size) {
      line.classList.add("border_bottom");
    }
    board.appendChild(line);
  }
}

/**Create a new zone with the right class */
function newZone(nb_line, nb_column) {
  var b = document.createElement("button");
  b.id = "line_" + nb_line + "_column_" + nb_column;
  b.classList.add("zone");
  b.classList.add("zone_empty");
  b.classList.add("line_" + nb_line);
  b.classList.add("column_" + nb_column);
  return b;
}

/**Create the clue for a specific line of a specific level */
function newClueLine(level, nb_line) {
  var li = document.createElement("li")
  li.id = "line_" + nb_line;
  li.classList.add("clues_line")
  li.classList.add("clues_normal");
  for (let clue of level.clues.line[nb_line]) {
    var p = document.createElement("p");
    p.classList.add("clue")
    p.classList.add("clue_normal")
    p.innerHTML = clue.toString();
    li.appendChild(p)
  }
  clues_lines.appendChild(li)
}
/**Create the clue for a specific line of a specific level */
function newClueColumn(level, nb_column) {
  var li = document.createElement("li");
  li.id = "column_" + nb_column;
  li.classList.add("clues_column");
  li.classList.add("clues_normal");
  for (let clue of level.clues.column[nb_column]) {
    var p = document.createElement("p");
    p.classList.add("clue")
    p.classList.add("clue_normal")
    p.innerHTML = clue.toString();
    li.appendChild(p)
  }
  clues_columns.appendChild(li)
}

/**Add all the event listener for the board */
function interactiveBoard() {
  //Add listener on the zones
  for (let zone of zones) {
    zone.onmousedown = function (e) {
      clickZone(e.target);
      action.onaction = true; //after because like that clickZone+onaction=fasle => first zone clicked
    };
    zone.onmouseenter = function (e) {
      if (action.onaction) {
        clickZone(e.target);
      }
    };
    document.onmouseup = function (e) {
      if (action.onaction) {
        action.onaction = false;
        action.empty = false;
      }
    }
  }
  //Add listener on the action button
  actionButton.onclick = function () {
    changeAction();
  };
}

/**Change class of a zone depending on the action*/
function clickZone(zone) {
  let line = zone.id.replace("line_", "").replace("column_", "").split("_")[0];
  let column = zone.id.replace("line_", "").replace("column_", "").split("_")[1];

  if (action.fill) {
    if (currentBoard[line][column] == 1) { //if already fill
      if (!action.onaction) { //only the first zone define if its an empty action or not
        action.empty = true;
      }
      if (action.empty) {
        zone.className = zone.className.replace("zone_fill", "zone_empty");
        currentBoard[line][column] = 0;
      }
    } else {
      if (!action.empty) {
        zone.className = zone.className.replace("zone_empty", "zone_fill");
        zone.className = zone.className.replace("zone_cross", "zone_fill");
        currentBoard[line][column] = 1;
      }
    }
  } else if (action.cross) {
    if (currentBoard[line][column] == 2) {//if already cross
      if (!action.onaction) { //only the first zone define if its an empty action or not
        action.empty = true;
      }
      if (action.empty) {
        zone.className = zone.className.replace("zone_cross", "zone_empty");
        currentBoard[line][column] = 0;
      }
    } else {
      if (!action.empty) {
        zone.className = zone.className.replace("zone_empty", "zone_cross");
        zone.className = zone.className.replace("zone_fill", "zone_cross");
        currentBoard[line][column] = 2;
      }
    }
  }

  checkConstraint(line, column);
}

/**Change the type of the futur action*/
function changeAction() {
  if (action.fill) {
    actionButton.innerHTML = "Cross";
    action.fill = false;
    action.cross = true;
  } else if (action.cross) {
    actionButton.innerHTML = "Fill";
    action.cross = false;
    action.fill = true;
  }
}

/**Check if the zones respect the constraint of a specific level*/
function checkConstraint(nb_line, column) {
  checkLineConstraint(nb_line);
  checkColumnConstraint(column);
}

function checkColumnConstraint(column) {

}

function checkLineConstraint(nb_line) {
  let clues = level.clues.line[nb_line];

  displayCluesLineNormal(nb_line);

  //build the areas
  let areas = [];
  let onarea = false;
  for (let value of currentBoard[nb_line]) {
    if (value == 1) {
      if (!onarea) {
        onarea = true;
        areas.push(0)
      }
      areas[areas.length - 1]++;
    } else {
      if (onarea) {
        onarea = false;
      }
    }
  }

  //check the validity of the areas
  if (areas.toString() === clues.toString()) {
    displayCluesLineDone(nb_line);
  } else if (areas.length > clues.length) {
    clues_lines.children[nb_line].className = clues_lines.children[nb_line].className.replace("clues_normal", "clues_ERROR");
  } else if (areas.length != 0) {
    constraintLineStartLeft(areas, nb_line, currentBoard[nb_line]);

  }
}

function constraintLineStartLeft(areas, nb_line, line_to_check) {
  let clues = level.clues.line[nb_line];

  let nb_check = 0;
  let oncheck = false;
  let nb_value = 0;
  for (let value of line_to_check) {
    nb_value++;
    if (value == 0) {
      if (oncheck && areas[nb_check] == clues[nb_check]) {
        let clue_done = clues_lines.children[nb_line].children[nb_check]
        clue_done.className = clue_done.className.replace("clue_normal", "clue_done");
        autoCrossZone(nb_line);
      }
      //we can't continue here so we check on the other side
      constraintLineStartRight(areas, nb_line, line_to_check)
      break;
    } else if (value == 1) {
      if (!oncheck) {
        oncheck = true;
      }
      if (nb_value == line_to_check.length) {
        //we check if the area is correct but as is was the one on right 
        if (areas[nb_check] == clues[clues.length - 1]) {
          let clue_done = clues_lines.children[nb_line].children[clues.length - 1]
          clue_done.className = clue_done.className.replace("clue_normal", "clue_done");
        } else {
          clues_lines.children[nb_line].className = clues_lines.children[nb_line].className.replace("clues_normal", "clues_ERROR");
          let clue_error = clues_lines.children[nb_line].children[clues.length - 1]
          clue_error.className = clue_error.className.replace("clue_normal", "clue_ERROR");
        }
        //if we are here, that means an area is missing (clue still "normal")=> fail
        displayCluesLineError(nb_line);
      }
    } else if (value == 2) {
      if (oncheck) {
        if (areas[nb_check] == clues[nb_check]) {
          let clue_done = clues_lines.children[nb_line].children[nb_check]
          clue_done.className = clue_done.className.replace("clue_normal", "clue_done");
        } else {
          clues_lines.children[nb_line].className = clues_lines.children[nb_line].className.replace("clues_normal", "clues_ERROR");
          let clue_error = clues_lines.children[nb_line].children[nb_check]
          clue_error.className = clue_error.className.replace("clue_normal", "clue_ERROR");
        }
        oncheck = false;
        nb_check++;
      }
    }
  }
}

function constraintLineStartRight(areas, nb_line, line_to_check) {
  // let nb_check = 0;
  // let oncheck = false;
  // for (let value of line_to_check) {
  //   if (value == 0) {
  //     if (oncheck && areas[nb_check] == clues[nb_check]) {
  //       let clue_done = clues_lines.children[nb_line].children[nb_check]
  //       clue_done.className = clue_done.className.replace("clue_normal", "clue_done");
  //       autoCrossZone(nb_line);
  //     }
  //     //we can't continue here so we check on the other side
  //     break;
  //   } else if (value == 1) {
  //     if (!oncheck) {
  //       oncheck = true;
  //     }
  //   } else if (value == 2) {
  //     if (oncheck) {
  //       if (areas[nb_check] == clues[nb_check]) {
  //         let clue_done = clues_lines.children[nb_line].children[nb_check]
  //         clue_done.className = clue_done.className.replace("clue_normal", "clue_done");
  //       } else {
  //         clues_lines.children[nb_line].className = clues_lines.children[nb_line].className.replace("clues_normal", "clues_ERROR");
  //         let clue_error = clues_lines.children[nb_line].children[nb_check]
  //         clue_error.className = clue_error.className.replace("clue_normal", "clue_ERROR");
  //       }
  //       oncheck = false;
  //       nb_check++;
  //     }
  //   }
  // }
}

function displayCluesLineNormal(nb_line) {
  clues_lines.children[nb_line].className = clues_lines.children[nb_line].className.replace("clues_ERROR", "clues_normal").replace("clues_done", "clues_normal");
  for (let clue_line of clues_lines.children[nb_line].children) {
    clue_line.className = clue_line.className.replace("clue_ERROR", "clue_normal").replace("clue_done", "clue_normal");
  }
}

function displayCluesLineDone(nb_line) {
  clues_lines.children[nb_line].className = clues_lines.children[nb_line].className.replace("clues_normal", "clues_done")
  for (let clue_done of clues_lines.children[nb_line].children) {
    clue_done.className = clue_done.className.replace("clue_ERROR", "clue_done").replace("clue_normal", "clue_done");
  }

  autoCrossLine(nb_line);
}

function displayCluesLineError(nb_line) {
  clues_lines.children[nb_line].className = clues_lines.children[nb_line].className.replace("clues_normal", "clues_ERROR");
  for (let clue_ERROR of clues_lines.children[nb_line].children) {
    console.log(clue_ERROR.id)
    clue_ERROR.className = clue_ERROR.className.replace("clue_normal", "clue_ERROR");
  }
}

function autoCrossLine(nb_line) {
  currentBoard[nb_line] = currentBoard[nb_line].map(function (v) { return v == 0 ? 2 : v });
  for (let zone of zones) {
    if (parseInt(zone.classList[2].replace("line_", "")) == nb_line && zone.classList[1] == "zone_empty") {
      zone.className = zone.className.replace("zone_empty", "zone_cross");
    }
  }
}

/**TODO */
function autoCrossZone(nb_line) {
  console.log("to do")
}

createBoard(level);
initializeCurrentBoard(level);
const zones = document.getElementsByClassName("zone");
const actionButton = document.getElementById("action");
interactiveBoard();