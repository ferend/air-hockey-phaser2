import Phaser from 'phaser-ce';

export class HockeyPuck extends Phaser.Sprite {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'ice-hockey-puck');
    this.scale.setTo(0.15, 0.15);
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;
    const radius = this.width * 4;
    this.body.setCircle(
      radius,
      // eslint-disable-next-line no-mixed-operators
      (-radius + 0.5 * this.width / this.scale.x),
      // eslint-disable-next-line no-mixed-operators
      (-radius + 0.5 * this.height / this.scale.y),
    );
    this.body.bounce.set(1);
    this.body.maxVelocity.x = 500;
    this.body.maxVelocity.y = 500;
  }
}
