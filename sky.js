'use strict'

const SKY = 'sky'
export default function (scene) {
    scene.load.image(SKY, 'assets/sky.png')
    this.create = () => scene.add.image(400, 300, SKY)
}
