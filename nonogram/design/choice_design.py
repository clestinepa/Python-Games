import design.game_design as gd
import design.global_design as d

COLOR_TITLE = d.MAIN
COLOR_BUTTON = d.MAIN
COLOR_FONT_BUTTON = d.WHITE

MARGIN_CHOICE = gd.CELL_SIZE * 2
FONT_TITLE = 75
MARGIN_BUTTON = gd.CELL_SIZE

WIDTH_BUTTON = 200
HEIGHT_BUTTON = 50
FONT_BUTTON = 30
BORDER_BUTTON_RADIUS = d.BORDER_RADIUS


def get_x_title(title):
    return (d.SIZE_WINDOW-title.get_width())/2
def get_y_title():
    return MARGIN_CHOICE

def get_x_button():
    return (d.SIZE_WINDOW-get_width_button())/2
def get_y_button(i):
    return MARGIN_CHOICE*2 + d.get_height_text(FONT_TITLE) + i*(MARGIN_BUTTON+get_height_button())
def get_width_button():
    return WIDTH_BUTTON
def get_height_button():
    return HEIGHT_BUTTON

def get_x_button_font(text):
    return get_x_button() + (get_width_button()-text.get_width())/2
def get_y_button_font(text, i):
    return get_y_button(i) + (get_height_button()-text.get_height())/2