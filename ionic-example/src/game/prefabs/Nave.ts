import { LoadedObject } from '../utils/LoadedObject'
import { Bullet } from '../prefabs/Bullet'
export class Nave extends Phaser.Sprite {
    private currentBullet: Bullet;
    private bulletGroup: Phaser.Group;
    private timerToShoot: Phaser.Timer;

    constructor(game: Phaser.Game, x: number, y: number, key: string, health: number, bulletGroup: Phaser.Group) {
        super(game, x, y, key);
        this.game = game;
        this.health = health;
        this.anchor.setTo(0.5);

        // cria um tiro por default
        this.currentBullet = new Bullet(game, this.x, this.y);
        this.currentBullet.name = "Default";

        //Cria pull de tiros
        this.bulletGroup = bulletGroup;
        this.bulletGroup.enableBody = true;

        // Cria timer para começar a atirar
        this.timerToShoot = game.time.create(false);
        this.timerToShoot.start();
    }

    public scheduleShooting() {
        this.shoot();
        this.timerToShoot.add(Phaser.Timer.SECOND, this.scheduleShooting, this);
    }

    public shoot() {
        let bullet: Bullet = this.bulletGroup.getFirstExists(false);
        let isEnemy = this.body.velocity.y > 0;

        if (!bullet) {
            if(isEnemy){
                bullet = this.currentBullet.createClone(this.x, this.bottom);
            }else{
                bullet = this.currentBullet.createClone(this.x, this.top);
            }
            this.bulletGroup.add(bullet);
        }
        else {
            if(isEnemy){
                bullet.reset(this.x, this.bottom);
            }else{
                bullet.reset(this.x, this.top);
            }
        }

        bullet.body.velocity.y = this.currentBullet.getSpeed();
    }


    public getTimerToShoot(): Phaser.Timer {
        return this.timerToShoot;
    }

    public getBulletGroup(): Phaser.Group {
        return this.bulletGroup;
    }

    public getCurrentBullet(): Bullet {
        return this.currentBullet;
    }
    public setCurrentBullet(bullet: Bullet) {
        this.currentBullet = bullet;
    }
}