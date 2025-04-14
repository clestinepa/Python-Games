import pygame
import level_detail as lvl
import design.game_design as gd
import domain.update_manager as mng

def verify_lvl():
    return not(len(lvl.CLUES_COLUMNS) != lvl.NB_CELL or len(lvl.CLUES_LINES) != lvl.NB_CELL)

def init_clues_columns(screen):
    x = 0
    for clues in lvl.CLUES_COLUMNS:
        mng.update_clues(screen, "COLUMN", x)
        x += 1

def init_clues_lines(screen):
    y = 0
    for clues in lvl.CLUES_LINES:
        mng.update_clues(screen, "LINE", y)
        y += 1

def init_board(screen):
    pygame.draw.rect(screen, color=gd.COLOR_BORDER_BOARD, rect=(gd.get_x_board(), gd.get_y_board(), gd.BOARD_SIZE, gd.BOARD_SIZE))
    for x in range(lvl.NB_CELL):
        for y in range(lvl.NB_CELL):
            mng.update_cell(screen, x, y, "EMPTY")
    for i in range(gd.NB_LINE_GROUP_CELLS):
        pygame.draw.rect(screen, color=gd.COLOR_BORDER_BOARD, rect=(gd.get_x_border_inside_v(i), gd.get_y_border_inside_v(), gd.get_width_border_inside_v() , gd.get_height_border_inside_v()))
        pygame.draw.rect(screen, color=gd.COLOR_BORDER_BOARD, rect=(gd.get_x_border_inside_h(), gd.get_y_border_inside_h(i), gd.get_width_border_inside_h() , gd.get_height_border_inside_h()))
  
def init_game(screen):
    screen.fill(gd.COLOR_BG)
    init_clues_columns(screen)
    init_clues_lines(screen)
    init_board(screen)
