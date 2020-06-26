import Phaser from 'phaser'
import _ from 'lodash'

export const scene = new Phaser.Scene('game')
console.log(Phaser.Input.Keyboard.KeyCodes)

scene.init = function() {
  this.platforms
  this.player = null
  this.score = 0
  this.scoreText
}

scene.preload = function() {
  this.load.image('sky', 'assets/sky.png')
  this.load.image('ground', 'assets/platform.png')
  this.load.image('star', 'assets/star.png')
  this.load.image('bomb', 'assets/bomb.png')
  this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
}

scene.create = function() {
  this.add.image(400, 300, 'sky')
  this.add.image(400, 300, 'star')

  this.platforms = this.physics.add.staticGroup()

  this.platforms
    .create(400, 568, 'ground')
    .setScale(2)
    .refreshBody()

  this.platforms.create(600, 400, 'ground')
  this.platforms.create(50, 250, 'ground')
  this.platforms.create(750, 220, 'ground')

  this.player = this.physics.add.sprite(100, 450, 'dude')
  this.player.setBounce(0.5)
  this.player.setCollideWorldBounds(true)

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  })

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  })
  this.player.body.setGravityY(300)
  this.physics.add.collider(this.player, this.platforms)

  this.stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  })

  this.stars.children.iterate(function(child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
  })

  this.physics.add.collider(this.stars, this.platforms)
  this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
  this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })
}

scene.update = function() {
  let cursors = this.input.keyboard.createCursorKeys()
  if (cursors.left.isDown) {
    this.player.setVelocityX(-160)

    this.player.anims.play('left', true)
  } else if (cursors.right.isDown) {
    this.player.setVelocityX(160)

    this.player.anims.play('right', true)
  } else {
    this.player.setVelocityX(0)

    this.player.anims.play('turn')
  }

  if (cursors.up.isDown && this.player.body.touching.down) {
    this.player.setVelocityY(-530)
  }
}

scene.startJump = function() {}
scene.collectStar = function(player, star) {
  star.disableBody(true, true)
  this.score += 10
  this.scoreText.setText('Score: ' + this.score)
}

scene.jump = function() {}

scene.end = function() {}
window.dongdong = this

function collectStar(player, star) {
  star.disableBody(true, true)
}
