class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene');
  }

  preload() {
    console.log('Hi there!');

    // loading texture of a chair
    this.load.image("tree", "/assets/tree.png");
    this.load.image("stone", "/assets/stone.png");
    this.load.spritesheet("player", "/assets/character.png", {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    // adding some trees to the scene
    this.trees = [];
    for(let i = 0; i < 3; i++) {
      let tree = new Tree(this, 100+100*i, 50+100*i, "tree");
      this.trees.push(tree);
    }

    this.stone = new Stone(this, 250, 50, "stone");

    // adding the player to the scene
    this.player = new Player(this, 200, 200, "player");

    // adding the NPC's into the scene
    this.npc = [];
    for(let i=0; i < 5; i++) {
      let mob = new NPC(this, 200, 200, "player");
      this.npc.push(mob);
    }
    
    // player create method
    this.player.create();

    // tree create method and collider with player and mobs
    this.trees.map((tree) => {
      tree.create();
      this.physics.add.collider(tree, this.player);
      this.npc.map((mob) => {
        this.physics.add.collider(tree, mob);
      });
    });

    // collider for stones and player
    this.physics.add.collider(this.stone, this.player);
    this.stone.create();

    // calling create foreach npc
    this.npc.map((mob) => {
      mob.create();
    });

    // setting the walkArea of the npc
    this.npc.map((mob) => {
      console.log(this.sys.game.scale.gameSize.height/2);
      mob.setWalkArea(this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height/2, 250, 180);
    });
  }

  update() {
    // calling the update methods
    this.player.update();

    // updating all npc
    this.npc.map((mob) => {
      mob.update();
    });
  }
}