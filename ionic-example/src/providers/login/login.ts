import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }

  public getLogin() {
    return this.http.get("http://localhost:8080/loginTeste")
      .timeout(60000)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    var err;
    try {
      err = error.json().error || 'Service error';
    } catch (e) {
      err = error;
    }
    return Observable.throw(err);
  }

}
