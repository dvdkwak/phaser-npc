class Tree extends Sprite {
  constructor(scene, x, y, textureKey) {
    super(scene, x, y, textureKey);
    this.scene = scene;
  }

  
  create() {
    this.body.setSize(13, 10);
    this.body.setOffset(16, 38);
    this.setScale(2);
    this.body.setImmovable();
    this.setDepth(this.y + this.height);
  }
}