import level_detail as lvl

# COLORS
WHITE = (255, 255, 255, 255)
DARK = (94, 116, 138, 255)
LIGHT = (220, 233, 252, 255)
MEDIUM = (167, 191, 215, 255)
MAIN = (106, 164, 221, 255)
COMPLEMENTARY = (205, 92, 92, 255)

COLOR_BG = WHITE

COLOR_BORDER_BOARD = DARK
# COLOR_BORDER_CELL_HOVER = MAIN

def get_color_cell_bg(type):
    if type == "FILL" :
        return MAIN
    if type == "CROSS" :
        return MEDIUM
    else :
        return WHITE
def get_color_cell_border():
    return LIGHT
def get_color_clues_border(type):
    if type == "ERROR" :
        return COMPLEMENTARY
    else :
        return MEDIUM
def get_color_clues_bg(type):
    if type == "ERROR" :
        return MEDIUM
    if type == "DONE" :
        return WHITE
    else:
        return MEDIUM
def get_color_clue(type):
    if type == "ERROR" :
        return COMPLEMENTARY
    if type == "DONE" :
        return LIGHT
    if type == "ALL_DONE" :
        return MEDIUM
    else:
        return DARK
    
    
# SIZE
NB_BORDER_INSIDE = lvl.NB_CELL // 5 - 1

CELL_SIZE = 30
MARGIN_GAME = CELL_SIZE * 2

BORDER_INSIDE_SIZE = 2
BORDER_OUTSIDE_SIZE = 4
BORDER_CELL_SIZE = 1
BORDER_CLUE_SIZE = 1
BORDER_CLUE_ERROR_SIZE = 2
BORDER_RADIUS = int(CELL_SIZE / 6)

FONT_CLUE = int(CELL_SIZE / 2)
MARGIN_CLUE = int(CELL_SIZE / 10)
CLUES_LONG_SIZE = CELL_SIZE * 2
CLUES_SHORT_SIZE = MARGIN_CLUE * 7

#CLUES
def get_x_clues_columns():
    return get_x_board() + BORDER_OUTSIDE_SIZE
def get_y_clues_columns():
    return MARGIN_GAME
def get_x_clues_lines():
    return MARGIN_GAME
def get_y_clues_lines():
    return get_y_board() + BORDER_OUTSIDE_SIZE
#column
def get_x_clues_border_column(x):
    return get_x_clues_columns() + (CELL_SIZE-CLUES_SHORT_SIZE)/2 + x*CELL_SIZE + ((x+1) // 5)*BORDER_INSIDE_SIZE
def get_y_clues_border_column():
    return get_y_clues_columns()
def get_width_clues_border_column():
    return CLUES_SHORT_SIZE
def get_height_clues_border_column():
    return CLUES_LONG_SIZE
def get_x_clues_bg_column(x):
    return get_x_clues_border_column(x) + BORDER_CLUE_SIZE
def get_y_clues_bg_column():
    return get_y_clues_border_column() + BORDER_CLUE_SIZE
def get_width_clues_bg_column():
    return CLUES_SHORT_SIZE - 2*BORDER_CLUE_SIZE
def get_height_clues_bg_column():
    return CLUES_LONG_SIZE - 2*BORDER_CLUE_SIZE

def get_x_clue_column(clue_text, x):
    return get_x_clues_bg_column(x) + 0.5 + (get_width_clues_bg_column()-clue_text.get_width())/2
def get_y_clue_column(clue_text, index_clue):
    return get_y_clues_bg_column() + get_height_clues_bg_column() - (index_clue+1)*(MARGIN_CLUE + clue_text.get_height())

#line
def get_x_clues_border_line():
    return get_x_clues_lines()
def get_y_clues_border_line(y):
    return get_y_clues_lines() + (CELL_SIZE-CLUES_SHORT_SIZE)/2 + y*CELL_SIZE + ((y+1) // 5)*BORDER_INSIDE_SIZE
def get_width_clues_border_line():
    return CLUES_LONG_SIZE
def get_height_clues_border_line():
    return CLUES_SHORT_SIZE
def get_x_clues_bg_line():
    return get_x_clues_border_line() + BORDER_CLUE_SIZE
def get_y_clues_bg_line(y):
    return get_y_clues_border_line(y) + BORDER_CLUE_SIZE
def get_width_clues_bg_line():
    return CLUES_LONG_SIZE - 2*BORDER_CLUE_SIZE
def get_height_clues_bg_line():
    return CLUES_SHORT_SIZE - 2*BORDER_CLUE_SIZE

def get_x_clue_line(clue_text, index_clue):
    return get_x_clues_bg_line() + get_width_clues_bg_line() - (index_clue+1)*(MARGIN_CLUE*2+clue_text.get_width()) + MARGIN_CLUE
def get_y_clue_line(clue_text, y):
    return get_y_clues_bg_line(y) + 1 + (get_height_clues_bg_line() - clue_text.get_height())/2

#BOARD
def get_x_board():
    return MARGIN_GAME + get_width_clues_border_line() + MARGIN_CLUE
def get_y_board():
    return MARGIN_GAME + get_height_clues_border_column() + MARGIN_CLUE
def get_size_board():
    return lvl.NB_CELL*CELL_SIZE + BORDER_OUTSIDE_SIZE*2 + BORDER_INSIDE_SIZE*NB_BORDER_INSIDE

#border inside
def get_x_border_inside_v(i):
    return get_x_board() + BORDER_OUTSIDE_SIZE + 5*(i+1)*CELL_SIZE
def get_y_border_inside_v():
    return get_y_clues_columns()
def get_width_border_inside_v():
    return BORDER_INSIDE_SIZE
def get_height_border_inside_v():
    return get_height_clues_border_column() + MARGIN_CLUE + get_size_board()

def get_x_border_inside_h():
    return get_x_clues_lines()
def get_y_border_inside_h(i):
    return get_y_board() + BORDER_OUTSIDE_SIZE + 5*(i+1)*CELL_SIZE
def get_width_border_inside_h():
    return get_width_clues_border_line() + MARGIN_CLUE + get_size_board()
def get_height_border_inside_h():
    return BORDER_INSIDE_SIZE

#cells
def get_x_cell_border(x):
    return get_x_board() + BORDER_OUTSIDE_SIZE + x*CELL_SIZE + (x // 5)*BORDER_INSIDE_SIZE
def get_y_cell_border(y):
    return get_y_board() + BORDER_OUTSIDE_SIZE + y*CELL_SIZE + (y // 5)*BORDER_INSIDE_SIZE
def get_size_cell_border():
    return CELL_SIZE
def get_x_cell_bg(x):
    return get_x_cell_border(x) + BORDER_CELL_SIZE
def get_y_cell_bg(y):
    return get_y_cell_border(y) + BORDER_CELL_SIZE
def get_size_cell_bg():
    return get_size_cell_border() - 2*BORDER_CELL_SIZE


#GAME
def get_width_game():
    return get_x_board() + get_size_board() + MARGIN_GAME
def get_height_game():
    return get_y_board() + get_size_board() + MARGIN_GAME
