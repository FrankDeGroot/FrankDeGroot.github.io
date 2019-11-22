'use strict'

const PLAYER = 'player'
export default class {
    constructor(scene) {
        this.scene = scene
        this.scene.load.spritesheet(PLAYER, 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
        this.gameOver = false
    }

    create() {
        this.player = this.scene.physics.add.sprite(100, 450, PLAYER)
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers(PLAYER, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'turn',
            frames: [{ key: PLAYER, frame: 4 }],
            frameRate: 20
        })

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers(PLAYER, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        this.cursors = this.scene.input.keyboard.createCursorKeys()
    }

    interact(all) {
        this.all = all
        this.scene.physics.add.collider(this.player, all.platforms.group)
        this.scene.physics.add.collider(this.player, all.bombs.group, this.hitBomb, null, this)
        this.scene.physics.add.overlap(this.player, all.stars.group, this.collectStar, null, this)
    }

    update() {
        if (this.gameOver)
            return
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)
            this.player.anims.play('left', true)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160)
            this.player.anims.play('right', true)
        } else {
            this.player.setVelocityX(0)
            this.player.anims.play('turn')
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330)
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true)
        this.all.score.add(10)
        if (this.all.stars.group.countActive(true) === 0) {
            this.all.stars.group.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true)
            })
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
            var bomb = this.all.bombs.group.create(x, 16, 'bomb')
            bomb.setBounce(1)
            bomb.setCollideWorldBounds(true)
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
            bomb.allowGravity = false
        }
    }

    hitBomb(player, bomb) {
        this.scene.physics.pause()
        player.setTint(0xff0000)
        player.anims.play('turn')
        this.gameOver = true
    }
}
