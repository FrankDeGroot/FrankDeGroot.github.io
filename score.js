'use strict'

export default class {
    constructor(scene) {
        this.scene = scene
        this.score = 0
    }

    create() {
        this.scoreText = this.scene.add.text(16, 16, this.text(), { fontSize: '32px', fill: '#ffffff' })
    }

    add(points) {
        this.score += points
        this.scoreText.setText(this.text())
    }

    text() {
        return 'Score: ' + this.score
    }
}
