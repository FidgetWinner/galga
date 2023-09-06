// sprite and attributes
let my_sprite = sprites.create(img`
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
`, SpriteKind.Player)
my_sprite.setStayInScreen(true)
info.setLife(3)
controller.moveSprite(my_sprite, 200, 200)
// firing projectile code
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_event_pressed() {
    let projectile = sprites.createProjectileFromSprite(img`
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
    `, my_sprite, 200, 0)
})
// enemy creation
game.onUpdateInterval(500, function on_update_interval() {
    let bogey = sprites.create(img`
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
    `, SpriteKind.Enemy)
    bogey.setVelocity(-randint(75, 125), 0)
    bogey.left = scene.screenWidth()
    bogey.y = randint(0, scene.screenHeight())
    bogey.setFlag(SpriteFlag.AutoDestroy, true)
})
// collision event code between sprites
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
// Collision events code between enemy and projectiles
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_projectile_overlap(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    sprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
