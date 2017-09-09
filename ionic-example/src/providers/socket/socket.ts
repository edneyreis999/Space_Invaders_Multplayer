import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';

import { Player } from '../../game/prefabs/Player'
import { HomeState } from '../../game/states/HomeState'
/*
  Generated class for the SocketProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SocketProvider {

  public socket: SocketIOClient.Socket;
  allPlayersService: any;
  allPlayersObservable: any; 

  newPlayerService: any;
  newPlayerObservable: any; 

  private homeState: HomeState;

  private socketHost: string = 'http://localhost:8081';

  constructor() {
    this.allPlayersService = Observable.create(observer => {
      this.allPlayersObservable = observer;
    });

    this.newPlayerService = Observable.create(observer => {
      this.newPlayerObservable = observer;
    });
  }

  initialize() {
    this.socket = io.connect(this.socketHost);

    this.socket.on("connect", (msg) => {
      console.log('on connect');
    });

    this.socket.on("reconnecting", (msg) => {
      console.log('on reconnecting');
    });

    this.socket.on("reconnect_error", (msg) => {
      console.log('on reconnect_error');
    });

    this.socket.on("reconnect_failed", (msg) => {
      console.log('on reconnect_failed');
    });

    this.socket.on('disconnect', function () {
      console.log('user disconnected');
    });

    this.socket.on("newplayer", (data) => {
      console.log("conversando com o player que acabou de entrar, enviando infomações dos outros players");
      this.newPlayerObservable.next(data);
    });

    this.socket.on("allplayers", (data: Array<IPlayerServer>) => {
      console.log("conversando com o player que acabou de entrar, enviando infomações dos outros players");
      this.allPlayersObservable.next(data);

      this.socket.on('move', function (data) {
        console.log("move Client!");
        console.log(data);
      });

      this.socket.on('remove', function (id) {
        console.log("remove Client!");
        console.log(id);
      });
    });

  }

  public askNewPlayer() {
    this.socket.emit('newplayer');
  }

  public getHomeState(){
    return this.homeState;
  }
  public setHomeState(state:HomeState){
    this.homeState = state;
  }

}
