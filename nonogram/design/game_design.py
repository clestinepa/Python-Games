from typing import Literal

import pygame
import level_detail as lvl
import design.global_design as d

COLOR_BG = d.WHITE
COLOR_BORDER_BOARD = d.DARK

def get_color_cell_bg(type: Literal['EMPTY', 'CROSS', 'FILL']):
    if type == "FILL" :
        return d.MAIN
    if type == "CROSS" :
        return d.MEDIUM
    else :
        return d.WHITE
def get_color_cell_border(hover=False):
    if hover:
        return d.MAIN
    else:
        return d.LIGHT
def get_color_clues_border(type: Literal['ERROR', 'DONE', 'DEFAULT']):
    if type == "ERROR" :
        return d.COMPLEMENTARY
    else :
        return d.MEDIUM
def get_color_clues_bg(type: Literal['ERROR', 'DONE', 'DEFAULT']):
    if type == "ERROR" :
        return d.MEDIUM
    if type == "DONE" :
        return d.WHITE
    else:
        return d.MEDIUM
def get_color_clue(type: Literal['DONE', 'DEFAULT', 'ERROR', 'ALL_DONE']):
    if type == "ERROR" :
        return d.COMPLEMENTARY
    if type == "DONE" :
        return d.LIGHT
    if type == "ALL_DONE" :
        return d.MEDIUM
    else:
        return d.DARK

DETAIL = {
    "NB_CELL" : 0,
    "CLUES_COLUMNS" : [],
    "CLUES_LINES" : []
}

def init_detail_lvl(choice: Literal['HARD', 'EASY']):
    DETAIL['NB_CELL'] = lvl.get_nb_cell(choice)
    DETAIL['CLUES_COLUMNS'] = lvl.get_clues_columns(choice)
    DETAIL['CLUES_LINES'] = lvl.get_clues_lines(choice)

CELL_SIZE = 30

#CLUES
BORDER_INSIDE_CLUE_SIZE = 1
BORDER_INSIDE_CLUE_ERROR_SIZE = 2
MARGIN_CLUE = 3
FONT_CLUE = 15
CLUE_HEIGHT = d.get_height_text(FONT_CLUE)
def get_max_clues():
    return max(max(len(clues) for clues in DETAIL['CLUES_LINES']), max(len(clues) for clues in DETAIL['CLUES_COLUMNS']))
def get_clues_long_size():
    return CLUE_HEIGHT*get_max_clues() + MARGIN_CLUE*(get_max_clues()+2)
CLUES_SHORT_SIZE = (2*CELL_SIZE)/3
BORDER_CLUES_RADIUS = d.BORDER_RADIUS

#BOARD
BORDER_BOARD_SIZE = 4
NB_CELLS_BY_GROUP = 5
def get_nb_line_group_cells():
    return DETAIL['NB_CELL'] // NB_CELLS_BY_GROUP - 1
LINE_GROUP_CELLS_SIZE = 2
BORDER_INSIDE_CELL_SIZE = 1
def get_board_size():
    return  DETAIL['NB_CELL']*CELL_SIZE + BORDER_BOARD_SIZE*2 + LINE_GROUP_CELLS_SIZE*get_nb_line_group_cells()

#GAME
def get_game_size():
    return get_board_size() + get_clues_long_size() + MARGIN_CLUE
def get_margin_game():
    return (d.SIZE_WINDOW - get_game_size())/2

#CLUES
def get_x_clues_columns():
    return get_x_board() + BORDER_BOARD_SIZE
def get_y_clues_columns():
    return get_margin_game()
def get_x_clues_lines():
    return get_margin_game()
def get_y_clues_lines():
    return get_y_board() + BORDER_BOARD_SIZE
#column
def get_x_clues_border_column(x: int):
    return get_x_clues_columns() + (CELL_SIZE-CLUES_SHORT_SIZE)/2 + x*CELL_SIZE + ((x+1) // NB_CELLS_BY_GROUP)*LINE_GROUP_CELLS_SIZE
def get_y_clues_border_column():
    return get_y_clues_columns()
def get_width_clues_border_column():
    return CLUES_SHORT_SIZE
def get_height_clues_border_column():
    return get_clues_long_size()
def get_x_clues_bg_column(x: int):
    return get_x_clues_border_column(x) + BORDER_INSIDE_CLUE_SIZE
def get_y_clues_bg_column():
    return get_y_clues_border_column() + BORDER_INSIDE_CLUE_SIZE
def get_width_clues_bg_column():
    return get_width_clues_border_column() - 2*BORDER_INSIDE_CLUE_SIZE
def get_height_clues_bg_column():
    return get_height_clues_border_column() - 2*BORDER_INSIDE_CLUE_SIZE
def get_x_clue_column(clue_text: pygame.Surface, x:int):
    return get_x_clues_bg_column(x) + 0.5 + (get_width_clues_bg_column()-clue_text.get_width())/2
def get_y_clue_column(place_clue: int):
    return get_y_clues_bg_column() + get_height_clues_bg_column() - (place_clue+1)*(MARGIN_CLUE + CLUE_HEIGHT)
#line
def get_x_clues_border_line():
    return get_x_clues_lines()
def get_y_clues_border_line(y: int):
    return get_y_clues_lines() + (CELL_SIZE-CLUES_SHORT_SIZE)/2 + y*CELL_SIZE + ((y+1) // NB_CELLS_BY_GROUP)*LINE_GROUP_CELLS_SIZE
def get_width_clues_border_line():
    return get_clues_long_size()
def get_height_clues_border_line():
    return CLUES_SHORT_SIZE
def get_x_clues_bg_line():
    return get_x_clues_border_line() + BORDER_INSIDE_CLUE_SIZE
def get_y_clues_bg_line(y: int):
    return get_y_clues_border_line(y) + BORDER_INSIDE_CLUE_SIZE
def get_width_clues_bg_line():
    return get_width_clues_border_line() - 2*BORDER_INSIDE_CLUE_SIZE
def get_height_clues_bg_line():
    return get_height_clues_border_line() - 2*BORDER_INSIDE_CLUE_SIZE

def get_x_clue_line(clue_text: pygame.Surface, place_clue: int):
    return get_x_clues_bg_line() + get_width_clues_bg_line() - (place_clue+1)*(MARGIN_CLUE*2+clue_text.get_width()) + MARGIN_CLUE
def get_y_clue_line(y: int):
    return get_y_clues_bg_line(y) + 1 + (get_height_clues_bg_line() - CLUE_HEIGHT)/2

#BOARD
def get_x_board():
    return get_margin_game() + get_width_clues_border_line() + MARGIN_CLUE
def get_y_board():
    return get_margin_game() + get_height_clues_border_column() + MARGIN_CLUE

#border inside
def get_x_border_inside_v(i: int):
    return get_x_board() + BORDER_BOARD_SIZE + LINE_GROUP_CELLS_SIZE*i + NB_CELLS_BY_GROUP*(i+1)*CELL_SIZE
def get_y_border_inside_v():
    return get_y_clues_columns()
def get_width_border_inside_v():
    return LINE_GROUP_CELLS_SIZE
def get_height_border_inside_v():
    return get_height_clues_border_column() + MARGIN_CLUE + get_board_size()

def get_x_border_inside_h():
    return get_x_clues_lines()
def get_y_border_inside_h(i: int):
    return get_y_board() + BORDER_BOARD_SIZE + LINE_GROUP_CELLS_SIZE*i + NB_CELLS_BY_GROUP*(i+1)*CELL_SIZE
def get_width_border_inside_h():
    return get_width_clues_border_line() + MARGIN_CLUE + get_board_size()
def get_height_border_inside_h():
    return LINE_GROUP_CELLS_SIZE

#cells
def get_x_cell_border(x: int):
    return get_x_board() + BORDER_BOARD_SIZE + x*CELL_SIZE + (x // NB_CELLS_BY_GROUP)*LINE_GROUP_CELLS_SIZE
def get_y_cell_border(y: int):
    return get_y_board() + BORDER_BOARD_SIZE + y*CELL_SIZE + (y // NB_CELLS_BY_GROUP)*LINE_GROUP_CELLS_SIZE
def get_size_cell_border():
    return CELL_SIZE
def get_x_cell_bg(x: int):
    return get_x_cell_border(x) + BORDER_INSIDE_CELL_SIZE
def get_y_cell_bg(y: int):
    return get_y_cell_border(y) + BORDER_INSIDE_CELL_SIZE
def get_size_cell_bg():
    return get_size_cell_border() - 2*BORDER_INSIDE_CELL_SIZE