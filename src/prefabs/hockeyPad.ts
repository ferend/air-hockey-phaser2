import Phaser from 'phaser-ce';

export class HockeyPad extends Phaser.Sprite {
  constructor(game: Phaser.Game, x: number, y: number, spriteName: string) {
    super(game, x, y, spriteName);
    this.scale.setTo(0.42, 0.42);
    this.game.physics.arcade.enableBody(this);
    this.body.position.x = 200;
    this.body.position.y = 200;
    const radius = this.width;
    this.body.setCircle(
      radius,
      (-radius + 0.5 * this.width / this.scale.x),
      (-radius + 0.5 * this.height / this.scale.y),
      );
    this.body.collideWorldBounds = true;
  }
}
