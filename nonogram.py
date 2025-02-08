import pygame
import initiation as init
import game_design as gd
import update_manager as up

pygame.init()

screen = pygame.display.set_mode((gd.get_width_game(), gd.get_height_game()))
pygame.display.set_caption("NonoGram")
clock = pygame.time.Clock()

if not(init.verify_lvl()) :
    print("Les détails du niveau ne sont pas correctement paramétrés")
    pygame.quit()
else :
    init.init_game(screen)

    running = True
    while running:
        
        action, x_cell, y_cell = None, None, None
        new_running, action, x_cell, y_cell = up.event_manager()
        running = new_running
        
        if action :            
            up.update_cell(screen, x_cell, y_cell, action)
            up.checkConstraints(screen, x_cell, y_cell)
        
        pygame.display.flip()
        # clock.tick(5)  # Contrôle la vitesse du jeu
            
    pygame.quit()
