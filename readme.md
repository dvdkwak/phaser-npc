# Notes of use code

Old use of setting animations within player object

```javascript
// animations
if(this.keys.up.isDown || this.keys.w.isDown) {
  this.anims.play('walk_up', true);
} else
if(this.keys.down.isDown || this.keys.s.isDown) {
  this.anims.play('walk_down', true);
} else
if(this.keys.left.isDown || this.keys.a.isDown) {
  this.anims.play('walk_left', true);
} else
if(this.keys.right.isDown || this.keys.d.isDown) {
  this.anims.play('walk_right', true);
} else {
  this.anims.stop();
}
```

Old code of setting movement of player object
```javascript
// movement
if(this.keys.up.isDown || this.keys.w.isDown) {
  this.body.setVelocityY(-this.speed);
} 
if(this.keys.down.isDown || this.keys.s.isDown) {
  this.body.setVelocityY(this.speed);
} 
if(this.keys.left.isDown || this.keys.a.isDown) {
  this.body.setVelocityX(-this.speed);
} 
if(this.keys.right.isDown || this.keys.d.isDown) {
  this.body.setVelocityX(this.speed);
}
```