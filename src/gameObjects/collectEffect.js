export const createCollectEffect = k => (operator) => {
    const effect = k.add([
        k.sprite('collect'),
        k.pos(operator),
        k.scale(1.3),
        k.origin('bot'),
        k.outline(2),
        k.z(9)
    ])
    const effect2 = k.add([
        k.sprite('collect'),
        k.pos(operator),
        k.scale(1.9),
        k.origin('bot'),
        k.opacity(0.2),
        k.outline(2),
        k.z(9)
    ])

    operator.onUpdate(() => {
        effect2.pos.x = operator.pos.x
        effect2.pos.y = operator.pos.y
        effect.pos.x = operator.pos.x
        effect.pos.y = operator.pos.y
    })

    effect.play('collect', {
        onEnd: () => {
            effect.destroy()
            effect2.destroy()
        }
    })
    effect2.play('collect', {
        speed: 15
    })

    return effect
}