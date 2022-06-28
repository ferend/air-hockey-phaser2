import Phaser from 'phaser-ce';

export class GoalArea extends Phaser.Sprite {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'goal-field');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.game.physics.arcade.enableBody(this);
    this.body.immovable = true;
    this.scale.setTo(0.4, 0.4);
    this.body.setSize(600, 200, 300, 200);
  }
}
