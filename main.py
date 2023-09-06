#sprite and attributes
my_sprite = sprites.create(img("""
    . . . . c c c c c c c . . . . .
    . . . c 6 7 7 7 7 7 6 c . . . .
    . . c 6 7 c 6 6 6 6 c 7 c . . .
    . . c 7 7 6 f 6 6 f 6 7 6 c . .
    . . c 7 7 7 7 7 7 7 7 7 7 c . .
    . . f 7 7 7 6 1 f f 1 8 7 f . .
    . . f 7 7 7 f 1 f f 1 f 6 f . .
    . . f 6 7 7 f 2 2 2 2 f f . . .
    . . c f 6 7 7 2 2 2 2 f c c . .
    . c 7 7 c c 7 7 7 7 7 7 7 7 c .
    c 7 7 7 6 c f 7 7 7 7 1 1 1 7 c
    c c 6 6 6 c c f 6 7 1 1 1 1 1 f
    . . c 6 6 6 c 6 6 1 1 1 1 1 1 f
    . . c 6 6 6 6 6 6 1 1 1 1 1 6 f
    . . . c 6 6 6 6 1 1 1 1 1 6 f .
    . . . . c c c c c c c c f f . .
"""), SpriteKind.player)
my_sprite.set_stay_in_screen(True)
info.set_life(3)
controller.move_sprite(my_sprite, 200, 200)

#firing projectile code
def on_event_pressed():
    projectile = sprites.create_projectile_from_sprite(img("""
        . . . . . . . e c 7 . . . . . .
        . . . . e e e c 7 7 e e . . . .
        . . c e e e e c 7 e 2 2 e e . .
        . c e e e e e c 6 e e 2 2 2 e .
        . c e e e 2 e c c 2 4 5 4 2 e .
        c e e e 2 2 2 2 2 2 4 5 5 2 2 e
        c e e 2 2 2 2 2 2 2 2 4 4 2 2 e
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
        c e e 2 2 2 2 2 2 2 2 2 2 4 2 e
        . e e e 2 2 2 2 2 2 2 2 2 4 e .
        . 2 e e 2 2 2 2 2 2 2 2 4 2 e .
        . . 2 e e 2 2 2 2 2 4 4 2 e . .
        . . . 2 2 e e 4 4 4 2 e e . . .
        . . . . . 2 2 e e e e . . . . .
    """), my_sprite, 200, 0)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_event_pressed)

#enemy creation
def on_update_interval():
    bogey = sprites.create(img("""
        . . . . f f f f f . f f f .
        . . . f f c c c c f f f f f
        . . f c c c c c c b f f f f
        . . f c c c c c c 3 c f f f
        . f c c c c c c c c 3 3 f .
        . f c c 4 c c c c c f f f .
        . f f e 4 4 c c c f f f f .
        . f f e 4 4 f b f 4 4 f f .
        . . f f d d f 1 4 d 4 f . .
        . . . f d d d d 4 f f f . .
        . . . f e 4 4 4 e e f . . .
        . . . f 3 3 3 e d d 4 . . .
        . . . f 3 3 3 e d d e . . .
        . . . f 6 6 6 f e e f . . .
        . . . . f f f f f f . . . .
        . . . . . . f f f . . . . .
    """), SpriteKind.enemy)
    bogey.set_velocity(-(randint(75, 125)), 0)
    bogey.left = scene.screen_width()
    bogey.y = randint(0, scene.screen_height())
    bogey.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(500, on_update_interval)

#collision event code between sprites
def on_on_overlap(sprite, otherSprite):
    otherSprite.destroy()
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

#Collision events code between enemy and projectiles
def on_projectile_overlap(sprite, otherSprite):
    otherSprite.destroy()
    sprite.destroy(effects.fire, 100)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_projectile_overlap)
