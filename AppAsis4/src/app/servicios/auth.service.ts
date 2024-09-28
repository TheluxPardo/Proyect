import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { usuariosSimulados } from '../models/data.models';
import { Usuario } from '../models/bd.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null); // Cambiar a Usuario o null
  usuario$ = this.usuarioSubject.asObservable();

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();

  buscarBD2(usuario: string, clave: string): void {
    const usuarioEncontrado = usuariosSimulados.find(
      u => u.usuario === usuario && u.clave === clave
    );

    if (usuarioEncontrado) {
      this.isAuthenticatedSubject.next(true);
      this.usuarioSubject.next(usuarioEncontrado); // Enviar el objeto Usuario completo
      this.loginFailedSubject.next(false);
    } else {
      this.isAuthenticatedSubject.next(false);
      this.loginFailedSubject.next(true);
    }
  }

  logout(): void {
    this.usuarioSubject.next(null); // Resetear al desloguearse
    this.isAuthenticatedSubject.next(false);
    this.loginFailedSubject.next(false);
  }

  isLoggedIn() {
    return this.isAuthenticated$;
  }
}
