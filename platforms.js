'use strict'

const PLATFORM = 'platform'
export default class {
    constructor(scene) {
        this.scene = scene
        scene.load.image(PLATFORM, 'assets/platform.png')
    }

    create() {
        this.group = this.scene.physics.add.staticGroup()
        this.group.create(400, 568, PLATFORM).setScale(2).refreshBody()
        this.group.create(600, 400, PLATFORM)
        this.group.create(50, 250, PLATFORM)
        this.group.create(750, 220, PLATFORM)
    }
}
