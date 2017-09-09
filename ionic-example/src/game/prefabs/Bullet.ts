import { LoadedObject } from '../utils/LoadedObject'
export class Bullet extends Phaser.Sprite {
    // por padrão os tiros vão de baixo para cima
    private speed: number = -100;
    private damageGiven = 10;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, LoadedObject.BULLET);
        this.game = game;
        this.anchor.setTo(0.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
    }

    public createClone(x:number, y:number): Bullet {
        let bulletClone: Bullet = new Bullet(this.game, x, y);
        bulletClone.setSpeed(this.speed);
        bulletClone.setDamageGiven(this.damageGiven);
        bulletClone.name = this.name;
        return bulletClone;
    }

    public getSpeed(): number {
        return this.speed;
    }
    public setSpeed(speed: number) {
        this.speed = speed;
    }

    public getDamageGiven(): number {
        return this.damageGiven;
    }
    public setDamageGiven(damageGiven: number) {
        this.damageGiven = damageGiven;
    }
}