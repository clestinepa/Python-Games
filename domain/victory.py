import pygame
import design.game_design as gd
import design.global_design as d

def display_victory(screen):
    font = pygame.font.Font(None, 50)
    victory_text = font.render("VICTORYYY !!!", True, d.COMPLEMENTARY)
    x= gd.get_x_board() + (gd.BOARD_SIZE-victory_text.get_width())/2
    y = gd.get_y_board() + (gd.BOARD_SIZE-victory_text.get_height())/2
    pygame.draw.rect(screen, color=gd.COLOR_BG, rect=(x, y, victory_text.get_width(), victory_text.get_height()))
    screen.blit(victory_text, (x, y))
