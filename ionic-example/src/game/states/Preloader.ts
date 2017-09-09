import { SocketProvider } from '../../providers/socket/socket';

export class Preloader extends Phaser.State {

    private preloadBar: Phaser.Sprite;
    private logo: Phaser.Sprite;

    private socket: SocketProvider;
    init(socket: SocketProvider){       
        this.socket = socket;
    }

    preload() {

        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);

        //  Set-up our preloader sprite
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);
        
        //  Load our actual games assets
        this.load.image('space', 'assets/images/space.png');    
        this.load.image('player', 'assets/images/player.png');    
        this.load.image('otherplayer', 'assets/images/otherplayer.jpg');  
        this.load.image('bullet', 'assets/images/bullet.png');    
        this.load.image('enemyParticle', 'assets/images/enemyParticle.png');    
        this.load.spritesheet('yellowEnemy', 'assets/images/yellow_enemy.png', 50, 46, 3, 1, 1);   
        this.load.spritesheet('redEnemy', 'assets/images/red_enemy.png', 50, 46, 3, 1, 1);   
        this.load.spritesheet('greenEnemy', 'assets/images/green_enemy.png', 50, 46, 3, 1, 1);       
        
        //load level data
        this.load.text('level1', 'assets/data/level1.json');
        this.load.text('level2', 'assets/data/level2.json');
        this.load.text('level3', 'assets/data/level3.json');
        
        //load audio
        this.load.audio('orchestra', ['assets/audio/8bit-orchestra.mp3', 'assets/audio/8bit-orchestra.ogg']);
    }

    create() {

        let tween:Phaser.Tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(()=> this.startMainGame());

    }

    startMainGame() {
        this.game.state.start('HomeState', true, false, "", this.socket);
    }

}