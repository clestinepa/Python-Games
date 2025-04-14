import pygame
import design.choice_design as cd

def display_title(screen):
    font = pygame.font.Font(None, cd.FONT_TITLE)
    title = font.render("NonoGram", True, cd.COLOR_TITLE)
    screen.blit(title, (cd.get_x_title(title), cd.get_y_title()))
    
def display_buttons(screen):
    font = pygame.font.Font(None, cd.FONT_BUTTON)
    easy = font.render("EASY", True, cd.COLOR_FONT_BUTTON)
    hard = font.render("HARD", True, cd.COLOR_FONT_BUTTON)
    pygame.draw.rect(screen, color=cd.COLOR_BUTTON, rect=(cd.get_x_button(), cd.get_y_button(0), cd.get_width_button(), cd.get_height_button()), border_radius=cd.BORDER_BUTTON_RADIUS)
    pygame.draw.rect(screen, color=cd.COLOR_BUTTON, rect=(cd.get_x_button(), cd.get_y_button(1), cd.get_width_button(), cd.get_height_button()), border_radius=cd.BORDER_BUTTON_RADIUS)
    screen.blit(easy, (cd.get_x_button_font(easy), cd.get_y_button_font(easy, 0)))
    screen.blit(hard, (cd.get_x_button_font(hard), cd.get_y_button_font(easy, 1)))

def init_choice(screen):
    display_title(screen)
    display_buttons(screen)
