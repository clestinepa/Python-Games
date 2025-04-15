from typing import Literal
import pygame
import design.choice_design as cd


def get_button_click(pos: tuple[int, int]) -> (Literal['HARD', 'EASY'] | None):
    x, y= pos[0], pos[1]
    if x > cd.get_width_button() + cd.get_x_button() or y > cd.get_y_button(1) + cd.get_height_button() or x < cd.get_x_button() or y < cd.get_y_button(0):
        return None
    else :
        if y > cd.get_y_button(1):
            return "HARD"
        elif y < cd.get_y_button(0) + cd.get_height_button():
            return 'EASY'
        else:
            return None
  
def event_manager() -> tuple[bool, Literal['HARD', 'EASY'] | None]:
    button = None
    choice = None
    running = True
    for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                button = get_button_click(event.pos)
                if button:
                    choice = button
    return running, choice