import pygame
import domain.initiation as init
import design.game_design as gd
import domain.update_manager as up
import domain.victory as v

pygame.init()

screen = pygame.display.set_mode((gd.get_width_game(), gd.get_height_game()))
pygame.display.set_caption("NonoGram")
clock = pygame.time.Clock()

if not(init.verify_lvl()) :
    print("Les détails du niveau ne sont pas correctement paramétrés")
    pygame.quit()
else :
    init.init_game(screen)

    running, victory = True, False
    while running:
        
        action, x_cell, y_cell = None, None, None
        new_running, action, x_cell, y_cell = up.event_manager()
        running = new_running
        
        if not victory and action:            
            up.update_cell(screen, x_cell, y_cell, action)
            up.checkConstraints(screen, x_cell, y_cell)
            victory = up.checkVictory()
            if victory:
                v.display_victory(screen)
       
        pygame.display.flip()
        # clock.tick(5)  # Contrôle la vitesse du jeu
            
    pygame.quit()
