import pygame
import random

# Initialisation de Pygame
pygame.init()

# Paramètres du jeu
CELL_SIZE = 20
NB_CELL_WIDTH_BOARD = 17
NB_CELL_HEIGHT_BOARD = 15
WIDTH_BOARD, HEIGHT_BOARD = NB_CELL_WIDTH_BOARD*CELL_SIZE, NB_CELL_HEIGHT_BOARD*CELL_SIZE
HEIGHT_HEADER = 3*CELL_SIZE
PADDING = CELL_SIZE
WIDTH, HEIGHT =  WIDTH_BOARD + 2*PADDING, HEIGHT_BOARD + 2*PADDING + HEIGHT_HEADER

WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
BLACK = (0, 0, 0)
HEADER_COLOR = (74, 117, 44)
MARGIN_COLOR = (87, 138, 52)
LIGHT_GREEN = (170, 215, 81)
DARK_GREEN = (162, 209, 73)

# Création de la fenêtre
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Snake Game")
clock = pygame.time.Clock()

# Chargement des textures
apple_img = pygame.image.load("snake/apple.png")
scale_factor = CELL_SIZE / apple_img.get_width()
apple_img = pygame.transform.scale_by(apple_img, scale_factor)
snake_img = pygame.image.load("snake/snake.png")
snake_img = pygame.transform.scale(snake_img, (CELL_SIZE*0.8, CELL_SIZE*0.8))

# Direction initiale
direction = "RIGHT"
change_to = direction

# Fonction pour définir la place de la nouvelle pomme 
def new_food():
    return (random.randrange(0, WIDTH_BOARD, CELL_SIZE) + PADDING, 
        random.randrange(0, HEIGHT_BOARD, CELL_SIZE) + HEIGHT_HEADER + PADDING)
    
# Initialisation du serpent et de la nourriture
X_SNAKE = PADDING + CELL_SIZE
Y_SNAKE = HEIGHT_HEADER + PADDING + (NB_CELL_HEIGHT_BOARD-1)/2 * CELL_SIZE

snake = [(X_SNAKE + 2*CELL_SIZE, Y_SNAKE), (X_SNAKE + CELL_SIZE, Y_SNAKE), (X_SNAKE, Y_SNAKE)]
food = new_food()
score = 0

# Fonction pour afficher le score
def show_score():
    font = pygame.font.Font(None, 35)
    score_text = font.render(f"Score: {score}", True, WHITE)
    screen.blit(score_text, (10, 10))

# Fonction pour dessiner la grille
def draw_board():
    screen.fill(HEADER_COLOR)
    pygame.draw.rect(screen, MARGIN_COLOR, (0, HEIGHT_HEADER, WIDTH, HEIGHT - HEIGHT_HEADER))
    for row in range(NB_CELL_HEIGHT_BOARD):
        for col in range(NB_CELL_WIDTH_BOARD):
            color = LIGHT_GREEN if (row + col) % 2 == 0 else DARK_GREEN
            pygame.draw.rect(screen, color, 
                             (PADDING + col * CELL_SIZE, HEIGHT_HEADER + PADDING + row * CELL_SIZE, CELL_SIZE, CELL_SIZE))     

# Boucle de jeu
running = True
while running:
    draw_board()
    
    # Gestion des événements
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP and direction != "DOWN":
                change_to = "UP"
            elif event.key == pygame.K_DOWN and direction != "UP":
                change_to = "DOWN"
            elif event.key == pygame.K_LEFT and direction != "RIGHT":
                change_to = "LEFT"
            elif event.key == pygame.K_RIGHT and direction != "LEFT":
                change_to = "RIGHT"
    
    # Mise à jour de la direction
    direction = change_to
    
    # Déplacement du serpent
    head_x, head_y = snake[0]
    if direction == "UP":
            head_y -= CELL_SIZE
    elif direction == "DOWN":
            head_y += CELL_SIZE
    elif direction == "LEFT":
            head_x -= CELL_SIZE
    elif direction == "RIGHT":
            head_x += CELL_SIZE
        
    # Nouvelle tête
    new_head = (head_x, head_y)
    
    # Vérification des collisions
    if new_head in snake or head_x < PADDING or head_x >= WIDTH - PADDING or head_y < HEIGHT_HEADER + PADDING or head_y >= HEIGHT - PADDING:
        running = False  # Fin du jeu
    
    # Ajout de la nouvelle tête
    snake.insert(0, new_head)
    
    # Vérification si le serpent mange la nourriture
    if new_head == food:
        score += 1
        food = new_food()
    else:
        snake.pop()  # Supprime la queue
    
    # Dessin du serpent et de la nourriture
    
    for segment in snake:
        screen.blit(snake_img, (segment[0], segment[1]))
    screen.blit(apple_img, (food[0], food[1]))
    
    # Affichage du score
    show_score()
    
    # Rafraîchissement de l'écran
    pygame.display.flip()
    clock.tick(5)  # Contrôle la vitesse du jeu

pygame.quit()
