from typing import Literal
import pygame
import level_detail as lvl
import design.game_design as gd
import domain.update_manager as mng

def verify_lvl(choice: Literal['HARD', 'EASY']) -> bool:
    NB_CELL, CLUES_COLUMNS, CLUES_LINES = lvl.get_nb_cell(choice), lvl.get_clues_columns(choice), lvl.get_clues_lines(choice)
    return not(len(CLUES_COLUMNS) != NB_CELL or len(CLUES_LINES) != NB_CELL)

def init_clues_columns(screen: pygame.Surface, choice: Literal['HARD', 'EASY']):
    CLUES_COLUMNS = lvl.get_clues_columns(choice)
    x = 0
    for clues in CLUES_COLUMNS:
        mng.update_clues(screen, "COLUMN", x)
        x += 1

def init_clues_lines(screen: pygame.Surface, choice: Literal['HARD', 'EASY']):
    CLUES_LINES = lvl.get_clues_lines(choice)
    y = 0
    for clues in CLUES_LINES:
        mng.update_clues(screen, "LINE", y)
        y += 1

def init_board(screen: pygame.Surface, choice: Literal['HARD', 'EASY']):
    NB_CELL = lvl.get_nb_cell(choice)
    pygame.draw.rect(screen, color=gd.COLOR_BORDER_BOARD, rect=(gd.get_x_board(), gd.get_y_board(), gd.get_board_size(), gd.get_board_size()))
    for x in range(NB_CELL):
        for y in range(NB_CELL):
            mng.update_cell(screen, x, y, "EMPTY")
    for i in range(gd.get_nb_line_group_cells()):
        pygame.draw.rect(screen, color=gd.COLOR_BORDER_BOARD, rect=(gd.get_x_border_inside_v(i), gd.get_y_border_inside_v(), gd.get_width_border_inside_v() , gd.get_height_border_inside_v()))
        pygame.draw.rect(screen, color=gd.COLOR_BORDER_BOARD, rect=(gd.get_x_border_inside_h(), gd.get_y_border_inside_h(i), gd.get_width_border_inside_h() , gd.get_height_border_inside_h()))
  
def init_game(screen: pygame.Surface, choice: Literal['HARD', 'EASY']):
    screen.fill(gd.COLOR_BG)
    mng.init_states(choice)
    gd.init_detail_lvl(choice)
    init_clues_columns(screen, choice)
    init_clues_lines(screen, choice)
    init_board(screen, choice)
