import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { Game } from '../../game/game';

import { SocketProvider } from '../../providers/socket/socket';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LoginProvider]
})
export class HomePage {
  /**
   * Game instance
   * @private
   * @type {Game}
   * @memberof HomePage
   */
  private gameInstance: Game;
  socketHost: string;

  /**
   * Creates an instance of HomePage.
   * @param {NavController} navCtrl 
   * @memberof HomePage
   */
  constructor( public navCtrl: NavController,  public loginProvider:LoginProvider, public socket: SocketProvider) {    
    this.gameInstance = new Game(loginProvider, socket);
    this.socketHost = "http://localhost:3000";

  }
}
