import { Nave } from '../prefabs/Nave'
import { Bullet } from '../prefabs/Bullet'

export class Enemy extends Nave {
    private imortal:boolean = false;
    constructor(game: Phaser.Game, x: number, y: number, key: string, health: number, bulletGroup: Phaser.Group) {
        super(game, x, y, key, health, bulletGroup);

        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = new Phaser.Signal();
        this.body.bounce.set(1);

        this.body.onWorldBounds.add((sprite: Phaser.Sprite) => {
            // se ele pingar para cima, ele morre.
            if (sprite.body.velocity.y < 1) {
                console.log("sprite.body.velocity.y: " + sprite.body.velocity.y);
                this.kill();
            }
        });

        this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false);

        // seta os tiros do inimigo
        let enemyBullet = new Bullet(this.game, x, y);
        enemyBullet.setSpeed(100);
        enemyBullet.name = "Enemy Bullet";
        this.setCurrentBullet(enemyBullet);

        this.scheduleShooting();

        // Se adiciona no jogo.
        game.add.existing(this);
    }

    public update() {
    }

    public customReset(x: number, y: number, health: number, key: string, scale: number, speedX: number, speedY: number) {
        super.reset(x, y, health);
        this.loadTexture(key);
        this.scale.setTo(scale);
        this.imortal = true;
        this.body.velocity.x = speedX;
        this.body.velocity.y = speedY;        
        // Bug! Quando o inimigo nasce perto do canto da tela, ele ricocheteia e volta!
        // isso faz com que a velocity.y dele fique negativa. dai ele morre!
        // esse if garante que a velocity dele seja sempre positiva
        if(this.body.velocity.y <= 1){
            this.body.velocity.y = speedY * -1;
        }
        // 1 sec de imortalidade para o inimigo, se não ele morre na saida.
        this.game.time.events.add(1000, () => {
            this.imortal = false;
        });

        this.getTimerToShoot().resume();
    }


    public kill(): Phaser.Sprite {
        if(!this.imortal){
            console.log("morri");
            let emitter = this.game.add.emitter(this.x, this.y, 100);
            emitter.makeParticles('enemyParticle');
            emitter.minParticleSpeed.setTo(-200, -200);
            emitter.maxParticleSpeed.setTo(200, 200);
            emitter.gravity = new Phaser.Point(0, 0);
            emitter.start(true, 500, null, 100);
    
            this.getTimerToShoot().pause();
            super.kill();
        }
        return this;
    }

    public damage(amount: number): Phaser.Sprite {
        super.damage(amount);

        //play "getting hit" animation
        this.play('getHit');

        return this;
    }

}