import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = 'https://reqres.in/api';

  constructor( private http: HttpClient ) { }

  getUsers() {
    return this.http.get(`${this.url}/users`).pipe( pluck('data') );
  }

}
