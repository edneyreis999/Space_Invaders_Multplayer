import { SocketProvider } from '../../providers/socket/socket';
export class Boot extends Phaser.State {

    private socket: SocketProvider;
    init(socket: SocketProvider){
        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.socket = socket;
        //this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
    }

    preload() {
        this.load.image('preloadBar', 'assets/images/loading/bar.png');
        this.load.image('logo', 'assets/images/loading/logo.png');
    }

    create() {

        //  Unless you specifically need to support multitouch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        this.game.stage.backgroundColor = '#fff';   
        this.game.state.start('Preloader', true, false, this.socket);

    }

}
    