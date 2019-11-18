'use strict'

import '//cdn.jsdelivr.net/npm/phaser@3.20.1/dist/phaser.min.js'

const Phaser = window.Phaser

window.addEventListener('click', () => {
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
            preload: preload,
            create: create,
            update: update
        }
    })
})

const SKY = 'sky'
const PLATFORM = 'platform'
const STAR = 'star'
const BOMB = 'bomb'
const PLAYER = 'player'

var bombs
var cursors
var gameOver = false
var player
var score = 0
var scoreText
var stars

function preload() {
    this.load.image(SKY, 'assets/sky.png')
    this.load.image(PLATFORM, 'assets/platform.png')
    this.load.image(STAR, 'assets/star.png')
    this.load.image(BOMB, 'assets/bomb.png')
    this.load.spritesheet(PLAYER, 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
}

function create() {
    this.add.image(400, 300, SKY)

    const platforms = this.physics.add.staticGroup()
    platforms.create(400, 568, PLATFORM).setScale(2).refreshBody()
    platforms.create(600, 400, PLATFORM)
    platforms.create(50, 250, PLATFORM)
    platforms.create(750, 220, PLATFORM)

    player = this.physics.add.sprite(100, 450, PLAYER)

    player.setBounce(0.2)
    player.setCollideWorldBounds(true)

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(PLAYER, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'turn',
        frames: [{ key: PLAYER, frame: 4 }],
        frameRate: 20
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(PLAYER, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    })

    cursors = this.input.keyboard.createCursorKeys()

    stars = this.physics.add.group({
        key: STAR,
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    })
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    bombs = this.physics.add.group();

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    this.physics.add.overlap(player, stars, collectStar, null, this)

    scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#ffffff' });
}

function update() {
    if (gameOver)
        return
    if (cursors.left.isDown) {
        player.setVelocityX(-160)
        player.anims.play('left', true)
    } else if (cursors.right.isDown) {
        player.setVelocityX(160)
        player.anims.play('right', true)
    } else {
        player.setVelocityX(0)
        player.anims.play('turn')
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330)
    }
}

function collectStar(player, star) {
    star.disableBody(true, true)
    score += 10;
    scoreText.setText('Score: ' + score);
    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
}

function hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}
