import { getProjectileVelocity, isOutOfScreen } from "../utils"
import { createExplosion } from "./explosion"

export const createProjectile = k => (startingPos, target) => {
    let { vx, vy, g } = getProjectileVelocity(startingPos, target, k.dt())

    const projectile = k.add([
        'projectile',
        k.state('idle', ['idle', 'shoot']),
        k.sprite('rock'),
        k.area(),
        k.pos(startingPos),
        k.opacity(0),
    ])

    projectile.onStateEnter('shoot', () => {
        projectile.opacity = 1
    })

    projectile.onStateUpdate('shoot', () => {
        projectile.pos.x += vx
        projectile.pos.y += vy
        vy += g
    })

    projectile.onUpdate(() => {
        if (isOutOfScreen(k)(projectile.pos)) {
            projectile.destroy()
        }
    })

    projectile.onCollide('fruit', (fruit) => {
        if (fruit._id === target._id) {
            shake(1)
            fruit.enterState('dropping')
            createExplosion(k)(fruit.pos)
        }
    })

    projectile.enterState('idle')

    return projectile
}