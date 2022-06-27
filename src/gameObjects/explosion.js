export const createExplosion = k => (vec) => {
    const explosion = k.add([
        k.pos(vec),
        k.origin('center'),
        k.sprite('explosion', { anim: 'explode', animSpeed: 1.5 }),
    ])

    explosion.play('explode', {
        onEnd: () => {
            explosion.destroy()
        }
    })
}