'use strict'

export default function (scene) {
    var score = 0
    var scoreText
    function text() {
        return 'Score: ' + score
    }
    return {
        create: () => scoreText = scene.add.text(16, 16, text(), { fontSize: '32px', fill: '#ffffff' }),
        add: points => {
            score += points
            scoreText.setText(text())
        }
    }
}
