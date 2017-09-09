
import { Player } from "../prefabs/Player";
export class PlayerControllerInput {
    game: Phaser.Game;
    player: Player;


    constructor(game: Phaser.Game, player: Player) {
        this.game = game;
        this.player = player;
    }

    public update() {
        //listen to user input
        if (this.game.input.activePointer.isDown) {
            //get the location of the touch
            var targetX = this.game.input.activePointer.position.x;

            //define the direction of the speed
            var direction = targetX >= this.game.world.centerX ? 1 : -1;

            this.player.move(direction);
        }
    }
}