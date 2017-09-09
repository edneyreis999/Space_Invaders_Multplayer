import { SocketProvider } from '../../providers/socket/socket';

export class HomeState extends Phaser.State {
    private socket: SocketProvider;
    message: string;


    init(message: string, socket: SocketProvider) {
        this.message = message;
        this.socket = socket;
        this.socket.initialize();
    }

    preload() { }

    create() {
        this.socket.setHomeState(this);
        //moving stars background
        let background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
        background.autoScroll(0, 30);

        background.inputEnabled = true;
        background.events.onInputDown.add(() => {
            this.game.state.start('MainGame', true, false, this.socket);
        });

        let style = { font: '35px Arial', fill: '#fff' };
        let stringTelaInicial: string = 'TOUCH TO START';
        let spriteTexto: Phaser.Sprite = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, stringTelaInicial, style);
        spriteTexto.anchor.setTo(0.5);

        if (this.message) {
            this.game.add.text(60, this.game.world.centerY - 200, this.message, style);
        }

        this.initPlayers()
        
    }

    private initPlayers(){
        let posSpawnX: number = 50;
        this.socket.askNewPlayer();

        this.socket.newPlayerService.subscribe((playerServer:IPlayerServer) => {
            // creating the local Player
            let newPlayer = this.add.sprite(0 + posSpawnX, this.game.world.centerY - 50, 'otherplayer');
            newPlayer.anchor.setTo(0.5);
            newPlayer.name = playerServer.id+"";

            let spriteTexto: Phaser.Sprite = this.game.add.text(newPlayer.x, newPlayer.y +50, newPlayer.name);
            spriteTexto.anchor.setTo(0.5);
    
            console.log("Player: "+newPlayer.name+" nasceu");
            console.log(playerServer);

          }); //end of creating local player



        this.socket.allPlayersService.subscribe((playersServer:Array<IPlayerServer>) => {   
            // creating the other players
            let isFist = true;

            console.log("entrei no allPlayersService");
            for (var i = 0; i < playersServer.length; i++) {
                // é o ultimo cara que conectou no socket! logo é o cara dessa instancia!!
                let player:Phaser.Sprite;
                
                if(i === (playersServer.length - 1)){
                    player = this.add.sprite(0 + posSpawnX, this.game.world.centerY - 50, 'player');                   
                }else{
                    player = this.add.sprite(0 + posSpawnX, this.game.world.centerY - 50, 'otherplayer');
                }               
                player.name = playersServer[i].id+"";
                player.anchor.setTo(0.5);

                let spriteTexto: Phaser.Sprite = this.game.add.text(player.x, player.y +50, player.name);
                spriteTexto.anchor.setTo(0.5);

                posSpawnX += 100;
                console.log("other Player: "+player.name+" nasceu");
                console.log(playersServer);
            }                
          }); //end of creating other player
    }

}
