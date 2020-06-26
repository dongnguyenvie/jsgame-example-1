import Phaser from 'phaser'
import { Menu } from './components/Menu'
import { scene } from './components/Scene'

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true
    }
  },
  scene: scene
}

const game = new Phaser.Game(config)

window.dongdong = game
// game.state.add("Menu", Menu);
