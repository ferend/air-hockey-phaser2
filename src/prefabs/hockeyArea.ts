import Phaser from 'phaser-ce';

export class HockeyArea extends Phaser.Sprite {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'ice-hockey');
    this.scale.setTo(game.camera.width / this.width, game.camera.height / this.height);
    this.anchor.setTo(0);
  }
}
