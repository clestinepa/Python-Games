from typing import Literal
import pygame
import level_detail as lvl
import game_design as gd

cells = [["EMPTY"] * lvl.NB_CELL for _ in range(lvl.NB_CELL)]
clue_states_lines = [["DEFAULT"] * len(lvl.CLUES_LINES[index]) for index in range(lvl.NB_CELL)]
clue_states_columns = [["DEFAULT"] * len(lvl.CLUES_COLUMNS[index]) for index in range(lvl.NB_CELL)]
clues_state_lines = ["DEFAULT" for _ in range(lvl.NB_CELL)]
clues_state_columns = ["DEFAULT" for _ in range(lvl.NB_CELL)]

#UPDATE
def update_clues(screen, type, index):
    if type == "LINE":
        print(f"clues_state : {clues_state_lines[index]}, clue_states : {clue_states_lines[index]}")
        pygame.draw.rect(screen, color=gd.get_color_clues_border(clues_state_lines[index]), border_radius=gd.BORDER_RADIUS, rect=(gd.get_x_clues_border_line(), gd.get_y_clues_border_line(index), gd.get_width_clues_border_line(), gd.get_height_clues_border_line()))
        pygame.draw.rect(screen, color=gd.get_color_clues_bg(clues_state_lines[index]), border_radius=gd.BORDER_RADIUS, rect=(gd.get_x_clues_bg_line(), gd.get_y_clues_bg_line(index), gd.get_width_clues_bg_line(), gd.get_height_clues_bg_line() ))
        index_clue = len(lvl.CLUES_LINES[index]) - 1
        place_clue = 0
        for clue in lvl.CLUES_LINES[index][::-1]:
            print(index_clue)
            font = pygame.font.Font(None, gd.FONT_CLUE)
            clue_text = font.render(f"{clue}", True, gd.get_color_clue(clue_states_lines[index][index_clue]))
            screen.blit(clue_text, (gd.get_x_clue_line(clue_text, place_clue), gd.get_y_clue_line(clue_text, index)))
            index_clue -= 1
            place_clue += 1
    else:
        print(f"clues_state : {clues_state_columns[index]}, clue_states : {clue_states_columns[index]}")
        pygame.draw.rect(screen, color=gd.get_color_clues_border(clues_state_columns[index]), border_radius=gd.BORDER_RADIUS, rect=(gd.get_x_clues_border_column(index), gd.get_y_clues_border_column(), gd.get_width_clues_border_column(), gd.get_height_clues_border_column()))
        pygame.draw.rect(screen, color=gd.get_color_clues_bg(clues_state_columns[index]), border_radius=gd.BORDER_RADIUS, rect=(gd.get_x_clues_bg_column(index), gd.get_y_clues_bg_column(), gd.get_width_clues_bg_column(), gd.get_height_clues_bg_column() ))
        index_clue = len(lvl.CLUES_COLUMNS[index]) - 1
        place_clue = 0
        for clue in lvl.CLUES_COLUMNS[index][::-1]:
            font = pygame.font.Font(None, gd.FONT_CLUE)
            clue_text = font.render(f"{clue}", True, gd.get_color_clue(clue_states_columns[index][index_clue]))
            screen.blit(clue_text, (gd.get_x_clue_column(clue_text, index), gd.get_y_clue_column(clue_text, place_clue)))
            index_clue -= 1
            place_clue += 1

def update_cell(screen, x, y, action):
    cells[y][x] = action
    pygame.draw.rect(screen, color=gd.get_color_cell_border(), rect=(gd.get_x_cell_border(x) , gd.get_y_cell_border(y), gd.get_size_cell_border(), gd.get_size_cell_border()))
    pygame.draw.rect(screen, color=gd.get_color_cell_bg(action), rect=(gd.get_x_cell_bg(x), gd.get_y_cell_bg(y), gd.get_size_cell_bg(), gd.get_size_cell_bg()))

#EVENT
def get_cell_click(pos):
    x = pos[0] - gd.get_x_board() - gd.BORDER_OUTSIDE_SIZE
    y = pos[1] - gd.get_y_board() - gd.BORDER_OUTSIDE_SIZE
    if x > 10*gd.CELL_SIZE or y > 10*gd.CELL_SIZE or x < 0 or y < 0:
        return None
    else :
        return (int(x/gd.CELL_SIZE),int(y/gd.CELL_SIZE))
   
def event_manager():
    action, x_cell, y_cell = None, None, None
    running = True
    for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.MOUSEBUTTONDOWN:
                x_cell, y_cell = get_cell_click(event.pos)
                if event.button == 1:
                    if cells[y_cell][x_cell] == "FILL":
                        action = "EMPTY"
                    else:
                        action = "FILL"
                if event.button == 3:
                    if cells[y_cell][x_cell] == "CROSS":
                        action = "EMPTY"
                    else:
                        action = "CROSS"
    return running, action, x_cell, y_cell 

