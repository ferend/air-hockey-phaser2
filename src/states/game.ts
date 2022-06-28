import Phaser from 'phaser-ce';
import { Sound } from '../helpers/sound';
import { HockeyArea } from '../prefabs/hockeyArea';
import { HockeyPad } from '../prefabs/hockeyPad';
import { HockeyPuck } from '../prefabs/hockeyPuck';
import { GoalArea } from '../prefabs/goalArea';

export class Game extends Phaser.State {
  private cursors: Phaser.CursorKeys;

  private text: Phaser.BitmapText;

  private spaceKey: Phaser.Key;

  private area: HockeyArea;

  private hockeyPuck : HockeyPuck;

  private hockeyPadBlue : HockeyPad;

  private hockeyPadRed : HockeyPad;

  private goalAreaUp : GoalArea;

  private goalAreaDown : GoalArea;

  public create(): void {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.text = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY + 100, 'font', 'Press Arrows / Space', 15);
    this.text.x -= ~~(this.text.width * 0.5);

    this.area = new HockeyArea(this.state.getCurrentState().game, 0, 0);
    this.game.add.existing(this.area);

    this.hockeyPuck = new HockeyPuck(this.game, this.game.world.centerX, this.game.world.centerY);
    this.game.add.existing(this.hockeyPuck);

    this.hockeyPadBlue = new HockeyPad(this.game, this.game.world.centerX, this.game.world.centerY, 'hockey-pad-blue');
    this.game.add.existing(this.hockeyPadBlue);

    this.hockeyPadRed = new HockeyPad(this.game, this.game.world.centerX, this.game.world.centerY, 'hockey-pad-red');
    this.game.add.existing(this.hockeyPadRed);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.goalAreaUp = new GoalArea(this.state.getCurrentState().game, 300, 2);
    this.game.add.existing(this.goalAreaUp);

    this.goalAreaDown = new GoalArea(this.state.getCurrentState().game, 300, 1800);
    this.game.add.existing(this.goalAreaDown);

    this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(() => {
      Sound.play();
    }, this);
  }

  padSpeed = 350;

  public update(): void {
    this.game.input.update();
    this.hockeyPadBlue.body.velocity.setTo(0, 0);

    if (this.cursors.down.isDown) {
      this.hockeyPadBlue.body.velocity.y = this.padSpeed;
    }
    if (this.cursors.up.isDown) {
      this.hockeyPadBlue.body.velocity.y = -this.padSpeed;
    }
    if (this.cursors.left.isDown) {
      this.hockeyPadBlue.body.velocity.x = -this.padSpeed;
    }
    if (this.cursors.right.isDown) {
      this.hockeyPadBlue.body.velocity.x = this.padSpeed;
    }
    this.physics.arcade.collide(this.hockeyPadBlue, this.hockeyPuck, this.collisionCallback.bind(this));
    if (this.physics.arcade.overlap(this.hockeyPuck, this.goalAreaUp)) {
      console.log('GOAL UPPER');
      this.resetHockeyPuck();
    }
    if (this.physics.arcade.overlap(this.hockeyPuck, this.goalAreaDown)) {
      console.log('GOAL DOWN');
      this.resetHockeyPuck();
    }
  }

  public collisionCallback(): void {
     this.hockeyPuck.body.velocity.y -= 40;
     this.hockeyPuck.body.velocity.x -= 40;
  }

  public resetHockeyPuck() : void {
    this.hockeyPuck.position.x = 540;
    this.hockeyPuck.position.y = 960;
    this.hockeyPuck.body.velocity.y = 0;
    this.hockeyPuck.body.velocity.x = 0;
  }

  public render(): void {
    this.game.debug.body(this.hockeyPuck);
    this.game.debug.body(this.hockeyPadBlue);
    this.game.debug.body(this.goalAreaUp);
  }
}
