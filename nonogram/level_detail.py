#easy
from typing import Literal


EASY = {
    "NB_CELL" : 10,
    #"NB_FILL" :52,
    "CLUES_COLUMNS" : [[1], [3, 2], [5, 3], [2, 5], [1, 4], [1, 4], [2, 5], [5, 3], [3, 2], [1]],
    "CLUES_LINES" : [[4], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [4], [6], [8], [10]]
}
HARD = {
    "NB_CELL" : 15,
    "CLUES_COLUMNS" : [[1,2,1,1], [2,1,1,2,1], [1,1,2,2,1], [2,2,2,1], [1,2,1,1,4], [6,1,3], [3, 5], [1,2,1,5], [5,6], [4,1,1,2], [5,1,1,1], [5,2,3], [3,5,1], [4,1,5,1], [1,1,5,2]],
    "CLUES_LINES" : [[3,1,1,2,2], [1,1,3,5], [1,4,6], [2,2,6], [1,1,4,1], [3,1,2], [1,2,4,2], [1,1,1], [1,3,4,4], [1,1,1,3], [1,5,3], [2,1,3,4], [1,6,4], [4,5,1], [1,1,1,2]]
}

def get_nb_cell(choice: Literal['HARD', 'EASY']) -> int:
    if choice == "HARD":
        return HARD["NB_CELL"]
    else :
        return EASY["NB_CELL"]
def get_clues_columns(choice: Literal['HARD', 'EASY']) -> list[list[int]]:
    if choice == "HARD":
        return HARD["CLUES_COLUMNS"]
    else :
        return EASY["CLUES_COLUMNS"]
def get_clues_lines(choice: Literal['HARD', 'EASY']) -> list[list[int]]:
    if choice == "HARD":
        return HARD["CLUES_LINES"]
    else :
        return EASY["CLUES_LINES"]