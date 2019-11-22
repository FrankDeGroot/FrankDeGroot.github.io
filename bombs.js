'use strict'

const BOMB = 'bomb'
export default class {
    constructor(scene) {
        this.scene = scene
        this.scene.load.image(BOMB, 'assets/bomb.png')
    }

    create() {
        this.group = this.scene.physics.add.group()
    }

    interact(all) {
        this.scene.physics.add.collider(this.group, all.platforms.group)
    }
}
