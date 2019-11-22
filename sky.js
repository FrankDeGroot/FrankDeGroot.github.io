'use strict'

const SKY = 'sky'
export default class {
    constructor(scene) {
        this.scene = scene
        scene.load.image(SKY, 'assets/sky.png')
    }

    create() {
        this.scene.add.image(400, 300, SKY)
    }
}
