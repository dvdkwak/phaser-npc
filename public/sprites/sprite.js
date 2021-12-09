class Sprite extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, textureKey = null) {
    super(scene, x, y, textureKey);
    this.scene = scene;
    this.textureKey = textureKey
    this.scene.add.existing(this)
    this.scene.physics.world.enableBody(this, 0);
  }
}