'use strict'

import '//cdn.jsdelivr.net/npm/phaser@3.20.1/dist/phaser.min.js'
// import './phaser.min.js'
import All from './all.js'
import Sky from './sky.js'
import Platforms from './platforms.js'
import Bombs from './bombs.js'
import Player from './player.js'
import Stars from './stars.js'
import Score from './score.js'

window.addEventListener('click', () => {
    var all
    new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {
            preload: function () {
                all = new All({
                    sky: new Sky(this),
                    platforms: new Platforms(this),
                    bombs: new Bombs(this),
                    stars: new Stars(this),
                    player: new Player(this),
                    score: new Score(this)
                })
            },
            create: function () {
                all.create()
            },
            update: function update() {
                all.update()
            }
        }
    })
})
