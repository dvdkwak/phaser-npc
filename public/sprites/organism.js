class Organism extends Sprite {

  /**
     * Default constructor method
     * @param {scene object} scene 
     * @param {integer} x X position
     * @param {integer} y Y position
     * @param {string} textureKey Key of the texture to be used by this object
     */
  constructor(scene, x, y, textureKey) {
    super(scene, x, y, textureKey);
    this.scene = scene;
    this.textureKey = textureKey;
    this.speed = 100;
    this.frameRate = 10;
    this.idleFrame = {
      down: 0,
      up: 0,
      right: 0,
      left: 0
    }
  } // end of construct


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
   * Set the idleframe of the player
   * @param {string} dir Direction you want to go, (up|down|left|right)
   * @return {void}
   */
   setIdleFrame(dir) {
    switch(dir) {
      case 'up':
        this.setFrame(this.idleFrame.up);
        break;
      case 'down':
        this.setFrame(this.idleFrame.down);
        break;
      case 'left':
        this.setFrame(this.idleFrame.left);
        break;
      case 'right':
        this.setFrame(this.idleFrame.right);
        break;
      default:
        this.setFrame(this.idleFrame.down);
        break;
    }
  } // end of setIdleFrame


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


  /**
   * Moving the person up
   */
   moveUp() {
    // movement
    this.body.setVelocityY(-this.speed);

    // animation
    this.anims.play('walk_up', true);
  } // end of moveUp


  /**
   * Moving the person down
   */
   moveDown() {
    // movement
    this.body.setVelocityY(this.speed);

    // animation
    this.anims.play('walk_down', true);
  } // end of moveDown


  /**
   * Moving the person left
   */
   moveLeft() {
    // movement
    this.body.setVelocityX(-this.speed);

    // animation
    this.anims.play('walk_left', true);
  } // end of moveLeft


  /**
   * Moving the person right
   */
   moveRight() {
    // movement
    this.body.setVelocityX(this.speed);

    // animation
    this.anims.play('walk_right', true);
  } // end of moveRight

} // end of NPC