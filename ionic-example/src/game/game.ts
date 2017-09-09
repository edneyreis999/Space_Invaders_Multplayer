
// import pixi, p2 and phaser ce
import "pixi";
import "p2";
import * as Phaser from "phaser-ce";
import { Component } from '@angular/core';
import { Boot } from "./states/Boot";
import { Preloader } from "./states/Preloader";
import { MainGame } from "./states/MainGame";
import { HomeState } from "./states/HomeState";
import { LoginProvider } from '../providers/login/login';
import { Observable } from 'rxjs/Rx';

import * as io from 'socket.io-client';
import { SocketProvider } from '../providers/socket/socket';


/**
 * Main entry game class 
 * @export
 * @class Game
 * @extends {Phaser.Game}
 */
export class Game extends Phaser.Game {
    /**
     * Creates an instance of Game.
     * @memberof Game
     */
    constructor(loginProvider: LoginProvider, public socket: SocketProvider) {
        // call parent constructor
        //initiate the Phaser framework
        super('100%', '100%', Phaser.AUTO, "game", null);
        /*
        console.log(loginProvider.getLogin().then((res) => {
            console.log("Deu bão: ");
            console.log(res);
        }).catch(err => {
            console.log("Deu rim: ");
            console.log(err);
        }));
        */

        this.state.add('Boot', Boot, false);
        this.state.add('Preloader', Preloader, false);
        this.state.add('HomeState', HomeState, false);
        this.state.add('MainGame', MainGame, false);

        this.state.start('Boot',true, false, socket);

        // add some game states

        // start with boot state
    }
}
