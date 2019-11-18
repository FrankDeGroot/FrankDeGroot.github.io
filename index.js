'use strict'

import '//cdn.jsdelivr.net/npm/phaser@3.20.1/dist/phaser.min.js'

const Phaser = window.Phaser

new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
})

const SKY = 'sky'
const LOGO = 'logo'
const RED = 'red'

function preload() {
    this.load.setBaseURL(window.location.protocol + '//labs.phaser.io')

    this.load.image(SKY, 'assets/skies/space3.png')
    this.load.image(LOGO, 'assets/sprites/phaser3-logo.png')
    this.load.image(RED, 'assets/particles/red.png')
}

function create() {
    this.add.image(400, 300, SKY)

    const particles = this.add.particles(RED)

    const emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    })

    const logo = this.physics.add.image(400, 100, LOGO)

    logo.setVelocity(100, 200)
    logo.setBounce(1, 1)
    logo.setCollideWorldBounds(true)

    emitter.startFollow(logo)
}
