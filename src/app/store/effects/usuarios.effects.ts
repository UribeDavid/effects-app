import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/usuario.service";
import * as usuariosActions from "../actions";

@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private _usuariosService: UsuarioService
    ) {}

    
    cargarUsuarios$ = createEffect( ():any => 
        this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            mergeMap( () => this._usuariosService.getUsers()
                .pipe(
                    map( (usuarios:Usuario[]) => 
                        usuariosActions.cargarUsuariosSuccess({ usuarios }) 
                    ),
                    catchError( err => of( usuariosActions.cargarUsuariosError({ payload: err })) )
                )
            )
        )
    );
}
