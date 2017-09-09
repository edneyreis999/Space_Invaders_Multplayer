import { SocketProvider } from '../../providers/socket/socket';
import { LoadedObject } from '../utils/LoadedObject'
import { Player } from '../prefabs/Player'
import { Enemy } from '../prefabs/Enemy'
import { Bullet } from '../prefabs/Bullet'

export class MainGame extends Phaser.State {
    private socket: SocketProvider;
    private numLevels: number = 3;
    private currentLevel: number = 1;

    private players: Phaser.Group;
    private enemies: Phaser.Group;

    private playersBullets: Phaser.Group;
    private enemiesBullets: Phaser.Group;

    private orchestra: Phaser.Sound;
    private player: Player;
    init(socket: SocketProvider) {
        //initiate physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.socket = socket;
        this.socket.askNewPlayer();
        console.log('current level:' + this.currentLevel);
    }

    create() {
        //moving stars background
        let background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, LoadedObject.SPACE);
        background.autoScroll(0, 30);

        this.enemies = this.game.add.group();
        this.players = this.game.add.group();
        this.playersBullets = this.game.add.group();
        this.enemiesBullets = this.game.add.group();

        // cria player
        this.player = new Player(this.game, this.game.world.centerX, this.game.world.height - 50, LoadedObject.PLAYER, 100, this.playersBullets);
        this.player.name = "Player 1";
        this.players.add(this.player);

        //load level
        this.loadLevel();

        this.orchestra = this.add.audio(LoadedObject.ORCHESTRA);
        this.orchestra.play();
    }

    update() {
        // Testa coisão entre playersBullets e enemies
        this.game.physics.arcade.overlap(this.playersBullets, this.enemies, this.damageEnemy, null, this);
        // Testa coisão entre enemiesBullets e players
        this.game.physics.arcade.overlap(this.enemiesBullets, this.players, this.killPlayer, null, this);
    }

    private damageEnemy(bullet: Bullet, enemy: Enemy) {
        console.log(enemy.name + " was damaged by " + bullet.getDamageGiven());
        console.log("The bullet name is: " + bullet.name);
        enemy.damage(bullet.getDamageGiven());

        console.log(enemy.name + " has " + enemy.health + " health left");
        bullet.kill();
    }

    private killPlayer(bullet: Bullet, player: Player) {
        player.kill();
        this.orchestra.stop();
        this.game.state.start('MainGame',true, false, this.socket);
    }

    private loadLevel() {
        const levelData: ILevel = JSON.parse(this.game.cache.getText(LoadedObject.LEVEL1));

        this.scheduleNextEnemy(levelData);
    }

    private scheduleNextEnemy(levelData: ILevel) {
        let currentEnemyIndex = 0;
        let nextEnemy: ILevelEnemy = levelData.enemies[currentEnemyIndex];
        
        levelData.enemies.forEach((enemyStatus: ILevelEnemy) => {
            let nextTime: number = 1000 * enemyStatus.time;
            console.log(nextTime);
            let nextEnemyTimer: Phaser.TimerEvent = this.game.time.events.add(nextTime, () => {
                this.createEnemy(enemyStatus);

                currentEnemyIndex++;
            })
        });
    }

    private createEnemy(enemyParams: ILevelEnemy) {
        let enemy: Enemy = this.enemies.getFirstExists(false);

        if (!enemy) {
            enemy = new Enemy(this.game, enemyParams.x, 50, enemyParams.key, enemyParams.health, this.enemiesBullets);
            this.enemies.add(enemy);
        }

        enemy.customReset(enemyParams.x, 50, enemyParams.health, enemyParams.key, enemyParams.scale, enemyParams.speedX, enemyParams.speedY);
    }

    

}