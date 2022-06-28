import Phaser from 'phaser-ce';
import { Sound } from '../helpers/sound';

export class Preload extends Phaser.State {
  private ready: boolean;

  public preload(): void {
    // Load awesome fonts
    this.game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');

    // Load sprite
    this.game.load.image('mushroom', 'assets/sprites/mushroom.png');
    this.game.load.image('ice-hockey', 'assets/sprites/ice-hockey.png');
    this.game.load.image('ice-hockey-puck', 'assets/sprites/ice-hockey-puck.png');
    this.game.load.image('hockey-pad-blue', 'assets/sprites/hockey-pad-blue.png');
    this.game.load.image('hockey-pad-red', 'assets/sprites/hockey-pad-red.png');
    this.game.load.image('goal-field', 'assets/sprites/goal-field.png');

    // Initialize Howler
    Sound.load();

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
  }

  public update(): void {
    if ((this.ready === true) && (Sound.loaded === true)) {
      this.game.state.start('Game');
    }
  }

  private onLoadComplete(): void {
    this.ready = true;
  }
}
