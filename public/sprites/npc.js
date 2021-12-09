class NPC extends Organism {

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
    this.idleFrame = {
      down: 0,
      up: 4,
      right: 8,
      left: 12
    }
    this.time = 0;
    this.actionTimer = 200;
    this.dir = 'none';
    this.speed = 50;
    this.preload();
  } // end of construct


  /**
   * Default preload method which should be called in the preload of the scene
   */
   preload() {
    // creating animations for the NPC
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

    // increasing the time of this object (an increase per frame)
    this.time++;

    // random movement for NPC when interval hits
    if(this.time >= this.actionTimer) {
      this.time = 0;
      this.setActionTimer();
      this.walkRandom();
    }

    // move a random direction
    switch(this.dir) {
      case 'down':
        this.moveDown();
        break;
      case 'up':
        this.moveUp();
        break;
      case 'left':
        this.moveLeft();
        break;
      case 'right':
        this.moveRight();
        break;
      default:
        this.body.setVelocity(0);
        this.anims.stop();
        break;
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


  /**
   * setting a random action to walk (or stand still)
   */
  walkRandom() {
    // choose a random direction (dir) to move to (4-directions)
    // is the key from the 'options'-array (0-7)
    let dir = Math.floor(Math.random() * 8);

    // array with possible directions
    let options = ['down', 'up', 'left', 'right', 'none', 'none', 'none', 'none'];

    // getting possible options based on the walkarea
    // on the x-axis
    if(this.x < this.walkArea.x-(this.walkArea.body.width/2)) {
      options = ['right', 'right', 'right', 'right', 'none', 'none', 'none', 'none'];
    } else 
    if(this.x > this.walkArea.x+(this.walkArea.body.width/2)) {
      options = ['left', 'left', 'left', 'left', 'none', 'none', 'none', 'none'];
    }

    // on the y-axis
    if(this.y < this.walkArea.y-(this.walkArea.body.height/2)) {
      options = ['down', 'down', 'down', 'down', 'none', 'none', 'none', 'none'];
    } else
    if(this.y > this.walkArea.y+(this.walkArea.body.height/2)) {
      options = ['up', 'up', 'up', 'up', 'none', 'none', 'none', 'none'];
    }

    // move a random direction
    this.dir = options[dir];
  } // end of walkRandom


  /**
   * Setting the timer before taking a new action
   */
  setActionTimer() {
    // random integer (10 options)
    let timer = Math.floor(1 + Math.random() * 10);

    // times 100 is new action timer
    this.actionTimer = timer*10;
  } // end of setActionTimer


  /**
   * setting the walking area in which this NPC will stay around
   * @param {integer} x X position in scene
   * @param {integer} y Y position in scene
   * @param {integer} width Width of the area
   * @param {integer} height Height of the area
   */
  setWalkArea(x = 0, y = 0, width = 50, height = 50) {
    this.walkArea = this.scene.add.sprite(x, y);
    this.scene.physics.world.enable(this.walkArea);
    this.walkArea.body.setSize(width, height);
  } // end of setWalkArea

} // end of NPC