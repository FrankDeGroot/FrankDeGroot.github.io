'use strict'

const PLAYER = 'player'
export default function (scene) {
    scene.load.spritesheet(PLAYER, 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
    var all
    var cursors
    var gameOver = false
    var player
    function collectStar(player, star) {
        star.disableBody(true, true)
        all.score.add(10)
        if (all.stars.noStarsLeft()) {
            all.stars.revive()
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
            all.bombs.add(x)
        }
    }
    function hitBomb(player, bomb) {
        bomb.disableBody(true, true)
        scene.physics.pause()
        player.setTint(0xff0000)
        player.anims.play('turn')
        gameOver = true
    }
    this.create = () => {
        player = scene.physics.add.sprite(100, 450, PLAYER)
        player.setBounce(0.2)
        player.setCollideWorldBounds(true)
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers(PLAYER, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })
        scene.anims.create({
            key: 'turn',
            frames: [{ key: PLAYER, frame: 4 }],
            frameRate: 20
        })
        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers(PLAYER, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })
        cursors = scene.input.keyboard.createCursorKeys()
    }
    this.interact = a => {
        all = a
        scene.physics.add.collider(player, all.platforms.group())
        scene.physics.add.collider(player, all.bombs.group(), hitBomb)
        scene.physics.add.overlap(player, all.stars.group(), collectStar)
    }
    this.update = () => {
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
}
