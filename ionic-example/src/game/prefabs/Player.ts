import { Nave } from '../prefabs/Nave'
import { Bullet } from '../prefabs/Bullet'
import {PlayerControllerInput} from '../config/PlayerControllerInput'
export class Player extends Nave {
    private PLAYER_SPEED: number = 200;
    private playerControllerInput:PlayerControllerInput;

    constructor(game: Phaser.Game, x: number, y: number, key: string, health: number, bulletGroup: Phaser.Group) {
        super(game, x, y, key, health, bulletGroup);
        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;        

        // seta os tiros do player
        let playerBullet = new Bullet(this.game, x, y);
        playerBullet.setSpeed(-100);
        playerBullet.setDamageGiven(1);
        playerBullet.name = "Custom Bullet"
        this.setCurrentBullet(playerBullet);

        
        this.playerControllerInput = new PlayerControllerInput(this.game, this);
        this.scheduleShooting();

        let spriteTexto: Phaser.Sprite = this.game.add.text(this.x, this.y +50, this.name);
        spriteTexto.anchor.setTo(0.5);
        
        // Se adiciona no jogo.
        game.add.existing(this);
        game.add.existing(spriteTexto);
    }

    public update(){
        super.update()
         //player is not moving by default
         this.body.velocity.x = 0;
         this.playerControllerInput.update();
    }

    public move(direction:number){
        this.body.velocity.x = direction * this.PLAYER_SPEED;
    }

    public kill(): Phaser.Sprite {
        return this;
    }
}