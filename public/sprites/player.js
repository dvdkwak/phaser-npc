class Player extends Organism {

  /**
   * Default constructor method
   * @param {scene object} scene 
   * @param {integer} x X position
   * @param {integer} y Y position
   * @param {string} textureKey Key of the texture to be used by this object
   */
  constructor(scene, x, y, textureKey) {
    super(scene, x, y, textureKey);
    this.body.setSize(8, 7);
    this.body.setCollideWorldBounds(true);
    this.setScale(2);
    this.keys = this.scene.input.keyboard.addKeys({
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right',
      w: 'W',
      s: 'S',
      a: 'A',
      d: 'D'
    });
    this.idleFrame = {
      down: 0,
      up: 4,
      right: 8,
      left: 12
    }
    this.preload();
  } // end of construct


  /**
   * Default preload method which should be called in the preload of the scene
   */
  preload() {
    // creating animations for the player
    this.createAnimations();

    // changing the display properties
    this.body.setOffset(4, 8);
    // this.setDisplaySize(100, 100);
  } // end of preload


  /**
   * Default create method which should be called in the create of the scene
   */
  create() {
    this.setIdleFrame('down');
  } // end of scene


  /**
   * Default update method which should be called in the update of the scene
   */
  update() {
    // save last velocity
    this.previousVelocity = this.body.velocity.clone();

    // reset velocity per frame
    this.body.setVelocity(0);

    // trying combination of movement and animation
    if(this.keys.up.isDown || this.keys.w.isDown) {
      this.moveUp();
    } else
    if(this.keys.down.isDown || this.keys.s.isDown) {
      this.moveDown();
    } else
    if(this.keys.left.isDown || this.keys.a.isDown) {
      this.moveLeft();
    } else
    if(this.keys.right.isDown || this.keys.d.isDown) {
      this.moveRight();
    } else {
      this.anims.stop();
    }

    // constrolling the speed with magic :3
    this.body.velocity.normalize().scale(this.speed);

    // set the idle frame
    if(this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      if(this.previousVelocity.x < 0) {
        this.setIdleFrame('left');
      }
      if(this.previousVelocity.x > 0) {
        this.setIdleFrame('right');
      }
      if(this.previousVelocity.y > 0){
        this.setIdleFrame('down');
      }
      if(this.previousVelocity.y < 0){
        this.setIdleFrame('up');
      }
    }

    // updating the depth
    this.setDepth(this.y);
  } // end of update


  /**
   * Method in which all animations of the player are defined
   */
  createAnimations() {
    // walk down animation
    let walkDown = {
      key: 'walk_down',
      frames: this.anims.generateFrameNumbers(this.textureKey, { start: 0, end: 3 }),
      frameRate: this.frameRate,
      repeat: -1
    };
    this.anims.create(walkDown);

    // walk up animation
    let walkUp = {
      key: 'walk_up',
      frames: this.anims.generateFrameNumbers(this.textureKey, { start: 4, end: 7 }),
      frameRate: this.frameRate,
      repeat: -1
    };
    this.anims.create(walkUp);

    // walk right animation
    let walkRight = {
      key: 'walk_right',
      frames: this.anims.generateFrameNumbers(this.textureKey, { start: 8, end: 11 }),
      frameRate: this.frameRate,
      repeat: -1
    };
    this.anims.create(walkRight);

    // walk left animation
    let walkLeft = {
      key: 'walk_left',
      frames: this.anims.generateFrameNumbers(this.textureKey, { start: 12, end: 15 }),
      frameRate: this.frameRate,
      repeat: -1
    };
    this.anims.create(walkLeft);
  } // end of createAnimeation

} // end of Player