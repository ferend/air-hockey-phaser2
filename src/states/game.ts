import Phaser from 'phaser-ce';
import { HockeyArea } from '../prefabs/hockeyArea';
import { HockeyPad } from '../prefabs/hockeyPad';
import { HockeyPuck } from '../prefabs/hockeyPuck';
import { GoalArea } from '../prefabs/goalArea';

export class Game extends Phaser.State {
  private cursors: Phaser.CursorKeys;

  private text: Phaser.BitmapText;

  private blueScore : Phaser.Text;

  private redScore : Phaser.Text;

  private redPoints : number = 0;

  private bluePoints : number = 0;

  private spaceKey: Phaser.Key;

  private area: HockeyArea;

  private hockeyPuck : HockeyPuck;

  private hockeyPadBlue : HockeyPad;

  private hockeyPadRed : HockeyPad;

  private goalAreaUp : GoalArea;

  private goalAreaDown : GoalArea;

  private keyW : Phaser.Key

  private keyA : Phaser.Key

  private keyS : Phaser.Key

  private keyD : Phaser.Key

  public create(): void {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.text = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY + 100, 'font', 'Press Arrows / Space', 15);
    this.text.x -= ~~(this.text.width * 0.5);

    this.area = new HockeyArea(this.state.getCurrentState().game, 0, 0);
    this.game.add.existing(this.area);

    this.redScore = this.add.text(100, 100, `Red Score: ${this.redPoints}`);
    this.game.add.existing(this.redScore);
    this.redScore.addColor('#ff0000', 0);

    this.blueScore = this.add.text(900, 1700, `Blue Score: ${this.bluePoints}`);
    this.game.add.existing(this.blueScore);
    this.blueScore.addColor('#0000ff', 0);

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

    // this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // this.spaceKey.onDown.add(() => {
    //   Sound.play();
    // }, this);

    this.keyA = this.input.keyboard.addKey(Phaser.Keyboard.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Keyboard.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Keyboard.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Keyboard.W);
  }

  padSpeed = 350;

  public update(): void {
    this.game.input.update();
    this.hockeyPadBlue.body.velocity.setTo(0, 0);
    this.hockeyPadRed.body.velocity.setTo(0, 0);

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
    if (this.keyS.isDown) {
      this.hockeyPadRed.body.velocity.y = this.padSpeed;
    }
    if (this.keyW.isDown) {
      this.hockeyPadRed.body.velocity.y = -this.padSpeed;
    }
    if (this.keyA.isDown) {
      this.hockeyPadRed.body.velocity.x = -this.padSpeed;
    }
    if (this.keyD.isDown) {
      this.hockeyPadRed.body.velocity.x = this.padSpeed;
    }


    this.physics.arcade.collide(this.hockeyPadBlue, this.hockeyPuck, this.collisionCallback.bind(this));
    this.physics.arcade.collide(this.hockeyPadRed, this.hockeyPuck, this.collisionCallback.bind(this));
    this.physics.arcade.collide(this.hockeyPadRed, this.hockeyPadBlue);

    if (this.physics.arcade.overlap(this.hockeyPuck, this.goalAreaUp)) {
      console.log('GOAL UPPER');
      this.resetHockeyPuck();
      this.bluePoints++;
      this.blueScore.setText(`Blue Score: ${this.bluePoints}`);
      this.resetHockeyPad();
    }
    if (this.physics.arcade.overlap(this.hockeyPuck, this.goalAreaDown)) {
      console.log('GOAL DOWN');
      this.resetHockeyPuck();
      this.redPoints++;
      this.redScore.setText(`Red Score: ${this.redPoints}`);
      this.resetHockeyPad();
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

  public resetHockeyPad() : void {
    this.hockeyPadBlue.position.y = 1500;
    this.hockeyPadRed.position.y = 100;
  }

  public render(): void {
    this.game.debug.body(this.hockeyPuck);
    this.game.debug.body(this.hockeyPadBlue);
    this.game.debug.body(this.hockeyPadRed);
    this.game.debug.body(this.goalAreaUp);
  }
}
