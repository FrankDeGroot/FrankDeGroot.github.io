'use strict'

const STAR = 'star'
export default class {
    constructor(scene) {
        this.scene = scene
        this.scene.load.image(STAR, 'assets/star.png')
    }

    create() {
        this.group = this.scene.physics.add.group({
            key: STAR,
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        })
        this.group.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })
    }

    interact(all) {
        this.scene.physics.add.collider(this.group, all.platforms.group)
    }
}
