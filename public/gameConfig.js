const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 320,
  backgroundColor: 0x3a7536,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0
      }
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game"
  },
  pixelArt: true,
  scene: [StartScene]
};

const game = new Phaser.Game(config);