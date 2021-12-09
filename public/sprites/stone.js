class Stone extends Sprite {

  constructor(scene, x, y, textureKey) {
    super(scene, x, y, textureKey);
    this.scene = scene;
  }

  create() {
    this.body.setSize(12, 5);
    this.body.setOffset(2, 10);
    this.setScale(2);
    this.body.setImmovable();
    this.setDepth(this.y + this.height - 5);
  }

}