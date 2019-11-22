'use strict'

const STAR = 'star'
export default function (scene) {
    scene.load.image(STAR, 'assets/star.png')
    var group
    return {
        group: () => group,
        create: () => {
            group = scene.physics.add.group({
                key: STAR,
                repeat: 11,
                setXY: { x: 12, y: 0, stepX: 70 }
            })
            group.children.iterate(child => child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)))
        },
        interact: all => scene.physics.add.collider(group, all.platforms.group()),
        noStarsLeft: () => group.countActive(true) === 0,
        revive: () => group.children.iterate(child => child.enableBody(true, child.x, 0, true, true))
    }
}
