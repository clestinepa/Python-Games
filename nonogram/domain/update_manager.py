import pygame
from typing import Literal
import level_detail as lvl
import design.game_design as gd

cells: list[list[Literal['EMPTY', 'CROSS', 'FILL']]] = []
clue_states_lines: list[list[Literal['DONE', 'DEFAULT', 'ERROR', 'ALL_DONE']]] = []
clue_states_columns: list[list[Literal['DONE', 'DEFAULT', 'ERROR', 'ALL_DONE']]] = []
clues_state_lines: list[Literal['ERROR', 'DONE', 'DEFAULT']] = []
clues_state_columns: list[Literal['ERROR', 'DONE', 'DEFAULT']] = []

DETAIL = {
    "NB_CELL" : 0,
    "CLUES_COLUMNS" : [],
    "CLUES_LINES" : []
}

#INIT
def init_states(choice: Literal['HARD', 'EASY']):
    NB_CELL, CLUES_COLUMNS, CLUES_LINES = lvl.get_nb_cell(choice), lvl.get_clues_columns(choice), lvl.get_clues_lines(choice)
    for i in range(NB_CELL):
        cells.append(["EMPTY"] * NB_CELL)
        clue_states_lines.append(["DEFAULT"] * len(CLUES_LINES[i]))
        clue_states_columns.append(["DEFAULT"] * len(CLUES_COLUMNS[i]))
        clues_state_lines.append("DEFAULT")
        clues_state_columns.append("DEFAULT")
    DETAIL['NB_CELL'] = NB_CELL
    DETAIL['CLUES_COLUMNS'] = CLUES_COLUMNS
    DETAIL['CLUES_LINES'] = CLUES_LINES

#UPDATE
def update_clues(screen: pygame.Surface, type: Literal['LINE', 'COLUMN'], index: int):
    if type == "LINE":
        pygame.draw.rect(screen, color=gd.get_color_clues_border(clues_state_lines[index]), border_radius=gd.BORDER_CLUES_RADIUS, rect=(gd.get_x_clues_border_line(), gd.get_y_clues_border_line(index), gd.get_width_clues_border_line(), gd.get_height_clues_border_line()))
        pygame.draw.rect(screen, color=gd.get_color_clues_bg(clues_state_lines[index]), border_radius=gd.BORDER_CLUES_RADIUS, rect=(gd.get_x_clues_bg_line(), gd.get_y_clues_bg_line(index), gd.get_width_clues_bg_line(), gd.get_height_clues_bg_line() ))
        index_clue = len(DETAIL['CLUES_LINES'][index]) - 1
        place_clue = 0
        for clue in DETAIL['CLUES_LINES'][index][::-1]:
            font = pygame.font.Font(None, gd.FONT_CLUE)
            clue_text = font.render(f"{clue}", True, gd.get_color_clue(clue_states_lines[index][index_clue]))
            screen.blit(clue_text, (gd.get_x_clue_line(clue_text, place_clue), gd.get_y_clue_line(index)))
            index_clue -= 1
            place_clue += 1
    else:
        pygame.draw.rect(screen, color=gd.get_color_clues_border(clues_state_columns[index]), border_radius=gd.BORDER_CLUES_RADIUS, rect=(gd.get_x_clues_border_column(index), gd.get_y_clues_border_column(), gd.get_width_clues_border_column(), gd.get_height_clues_border_column()))
        pygame.draw.rect(screen, color=gd.get_color_clues_bg(clues_state_columns[index]), border_radius=gd.BORDER_CLUES_RADIUS, rect=(gd.get_x_clues_bg_column(index), gd.get_y_clues_bg_column(), gd.get_width_clues_bg_column(), gd.get_height_clues_bg_column() ))
        index_clue = len(DETAIL['CLUES_COLUMNS'][index]) - 1
        place_clue = 0
        for clue in DETAIL['CLUES_COLUMNS'][index][::-1]:
            font = pygame.font.Font(None, gd.FONT_CLUE)
            clue_text = font.render(f"{clue}", True, gd.get_color_clue(clue_states_columns[index][index_clue]))
            screen.blit(clue_text, (gd.get_x_clue_column(clue_text, index), gd.get_y_clue_column(place_clue)))
            index_clue -= 1
            place_clue += 1

def update_cell(screen: pygame.Surface, x: int, y: int, action: Literal['EMPTY', 'CROSS', 'FILL']):
    cells[y][x] = action
    pygame.draw.rect(screen, color=gd.get_color_cell_border(), rect=(gd.get_x_cell_border(x) , gd.get_y_cell_border(y), gd.get_size_cell_border(), gd.get_size_cell_border()))
    pygame.draw.rect(screen, color=gd.get_color_cell_bg(action), rect=(gd.get_x_cell_bg(x), gd.get_y_cell_bg(y), gd.get_size_cell_bg(), gd.get_size_cell_bg()))

def autoCross(screen: pygame.Surface, cells_to_check: list[Literal["EMPTY", "FILL", "CROSS"]], type: Literal["LINE", "COLUMN"] , index: int):
    cell_index = 0
    for cell in cells_to_check:
        if cell == "EMPTY":
            if type == "LINE":
                update_cell(screen, cell_index, index, "CROSS")
                clues = DETAIL['CLUES_COLUMNS'][cell_index]
                cells_to_check = []
                for line in cells:
                    cells_to_check.append(line[cell_index])
                checkCellsConstraints(screen, clues, cells_to_check, "COLUMN", cell_index)
            else:
                update_cell(screen, index, cell_index, "CROSS")
                clues = DETAIL['CLUES_LINES'][cell_index]
                cells_to_check = cells[cell_index]
                checkCellsConstraints(screen, clues, cells_to_check, "LINE", cell_index)
        cell_index += 1

#EVENT
def get_cell_click(pos: tuple[int, int]) -> (tuple[None, None] | tuple[int, int]) :
    x = pos[0] - gd.get_x_board() - gd.BORDER_BOARD_SIZE
    y = pos[1] - gd.get_y_board() - gd.BORDER_BOARD_SIZE
    if x > DETAIL['NB_CELL']*gd.CELL_SIZE or y > DETAIL['NB_CELL']*gd.CELL_SIZE or x < 0 or y < 0:
        return None, None
    else :
        return (int(x/gd.CELL_SIZE),int(y/gd.CELL_SIZE))
   
def event_manager() -> tuple[bool, Literal['EMPTY', 'CROSS', 'FILL'] | None, int | None, int | None]:
    action, x_cell, y_cell = None, None, None
    running = True
    for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.MOUSEBUTTONDOWN:
                x_cell, y_cell = get_cell_click(event.pos)
                if x_cell != None and y_cell != None:
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

#CONSTRAINTS
def buildAreas(cells_to_check: list[Literal["EMPTY", "FILL", "CROSS"]]) -> tuple[list[int], int, int]: 
    areas = []
    onArea = False
    nb_cross = 0
    nb_fill = 0
    for cell in cells_to_check:
        if cell == "FILL":
            if not onArea:
                onArea = True
                areas.append(0)
            areas[len(areas) - 1] += 1
            nb_fill += 1
        if cell == "CROSS":
            onArea = False
            nb_cross += 1
            areas.append(0)
        if cell == "EMPTY":
            onArea = False
            areas.append(-1)
    return areas, nb_cross, nb_fill     

def checkArea(clue: int, area: int, byEmpty=False) -> Literal['DONE', 'DEFAULT', 'ERROR'] :
    if not byEmpty and area == clue:
        return "DONE"
    else:
        if byEmpty and not(area > clue):
            return "DEFAULT"
        else:
            return "ERROR"

def checkValidityAreasStartRight(clues: list[int], index_area_already_check: int, clues_state: Literal["DONE", "DEFAULT", "ERROR"], clue_states: list[Literal["DONE", "DEFAULT", "ERROR", "ALL_DONE"]], areas: list[int]) -> tuple[Literal['DONE', 'DEFAULT', 'ERROR'], list[Literal['DONE', 'DEFAULT', 'ERROR', 'ALL_DONE']]]:
    areas_already_check = index_area_already_check + 1
    clues.reverse()
    clue_states.reverse()
    areas.reverse()
    index_area_on_check = -1
    for i in range(len(areas)):
        area = areas[i]
        #if we find an empty cell we stop the checking
        if area == -1:
            break
        #if we find an area, we check it !
        if area > 0:
            index_area_on_check += 1
            if (areas[i+1] == 0 and index_area_on_check + 1 + areas_already_check > len(clues)) or clue_states[index_area_on_check] != "DEFAULT":
                clues_state = "ERROR"
                clue_states = ["DEFAULT" for _ in range(len(clues))]
                break
            if i != len(areas) - 1 and areas[i+1] == -1 :
                clue_states[index_area_on_check] = checkArea(clues[index_area_on_check], area, byEmpty=True)
            else:
                clue_states[index_area_on_check] = checkArea(clues[index_area_on_check], area)
    clues.reverse()
    clue_states.reverse()
    areas.reverse()
    return clues_state, clue_states
 
def checkValidityAreasStartLeft(clues: list[int], areas: list[int]) -> tuple[Literal['ERROR', 'DONE', 'DEFAULT'], list[Literal['DONE', 'DEFAULT', 'ERROR', 'ALL_DONE']]]:
    clues_state = "DEFAULT"
    clue_states = ["DEFAULT" for _ in range(len(clues))]
        
    index_area_on_check = -1
    for i in range(len(areas)):
        area = areas[i]
        #if we find an empty cell we stop the checking
        if area == -1:
            #if there is still some areas to check, we check from right
            if index_area_on_check != len(areas) - 1:
                clues_state, clue_states = checkValidityAreasStartRight(clues, index_area_on_check, clues_state, clue_states, areas)
            break
        #if we find an area, we check it !
        if area > 0:
            index_area_on_check += 1
            if i != len(areas) - 1 and areas[i+1] == -1 :
                clue_states[index_area_on_check] = checkArea(clues[index_area_on_check], area, byEmpty=True)
            else:
                clue_states[index_area_on_check] = checkArea(clues[index_area_on_check], area)                
    
    if "ERROR" in clue_states:
        clues_state = "ERROR"
    return clues_state, clue_states
                
def checkCellsConstraints(screen: pygame.Surface, clues: list[int], cells_to_check: list[Literal["EMPTY", "FILL", "CROSS"]], type: Literal["LINE", "COLUMN"] , index: int):
    #build the areas
    areas, nb_cross, nb_fill = buildAreas(cells_to_check)
    
    clues_state = "DEFAULT"
    clue_states = ["DEFAULT" for _ in range(len(clues))]
    if type == "LINE" :
        clues_state_lines[index] = clues_state
        clue_states_lines[index] = clue_states
    else:
        clues_state_columns[index] = clues_state
        clue_states_columns[index] = clue_states
    
    #areas === clues => all done
    if str([i for i in areas if i > 0]) == str(clues):
        clues_state = "DONE"
        clue_states = ["ALL_DONE" for _ in range(len(clues))]
        autoCross(screen, cells_to_check, type, index)
        
    #too much "validate" areas or all zones are crossed => fail
    elif (len([i for i in areas if i > 0]) > len(clues) and nb_cross + nb_fill == DETAIL['NB_CELL']) or nb_cross == DETAIL['NB_CELL']:
        clues_state = "ERROR"
        clue_states = ["DEFAULT" for _ in range(len(clues))]
    
    #not perfect areas => check Areas
    elif len([i for i in areas if i > 0]) != 0:
        clues_state, clue_states = checkValidityAreasStartLeft(clues, areas)
    
    if type == "LINE" :
        clues_state_lines[index] = clues_state
        clue_states_lines[index] = clue_states
    else:
        clues_state_columns[index] = clues_state
        clue_states_columns[index] = clue_states
    update_clues(screen, type, index)
        
def checkConstraints(screen: pygame.Surface, x: int, y: int):
    #check constraint line
    clues = DETAIL['CLUES_LINES'][y]
    cells_to_check = cells[y]
    checkCellsConstraints(screen, clues, cells_to_check, "LINE", y)
        
    #check constraint column
    clues = DETAIL['CLUES_COLUMNS'][x]
    cells_to_check = []
    for line in cells:
        cells_to_check.append(line[x])
    checkCellsConstraints(screen, clues, cells_to_check, "COLUMN", x)

def checkVictory() -> bool:
    return all(clues == "DONE" for clues in clues_state_lines) and all(clues == "DONE" for clues in clues_state_columns)
