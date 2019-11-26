'use strict'

const BOMB = 'bomb'
export default function (scene) {
    scene.load.image(BOMB, 'assets/bomb.png')
    var group
    this.group = () => group
    this.create = () => group = scene.physics.add.group()
    this.interact = all => scene.physics.add.collider(group, all.platforms.group())
    this.add = x => {
        var bomb = group.create(x, 16, BOMB)
        bomb.setBounce(1)
        bomb.setCollideWorldBounds(true)
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
        bomb.allowGravity = false
    }
}
