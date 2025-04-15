import pygame
import init.initiation_game as ig
import init.initiation_choice as ic
import design.global_design as d
import domain.choice_manager as cm
import domain.update_manager as um
import domain.victory as v

pygame.init()

screen = pygame.display.set_mode((d.SIZE_WINDOW, d.SIZE_WINDOW))
pygame.display.set_caption("NonoGram")
clock = pygame.time.Clock()

running = True
choice = None
while running and not(choice):
    ic.init_choice(screen)
    running, choice = cm.event_manager()
    
    pygame.display.flip()

if not(ig.verify_lvl(choice)) :
    print("Les détails du niveau ne sont pas correctement paramétrés")
    pygame.quit()
else :
    ig.init_game(screen, choice)
    
    running_game, victory = True, False
    while running and running_game:
        
        action, x_cell, y_cell = None, None, None
        new_running, action, x_cell, y_cell = um.event_manager()
        running = new_running
        
        if not(victory) and action:            
            um.update_cell(screen, x_cell, y_cell, action)
            um.checkConstraints(screen, x_cell, y_cell)
            victory = um.checkVictory()
            if victory:
                v.display_victory(screen)
       
        pygame.display.flip()
        # clock.tick(5)  # Contrôle la vitesse du jeu
            
    pygame.quit()
