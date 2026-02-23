import { Component, inject, Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UsuarioServicio } from '../usuario-servicio/usuario-servicio';

@Component({
  selector: 'app-auth-service',
  imports: [],
  templateUrl: './auth-service.html',
  styleUrl: './auth-service.css',
})
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private servicioUsuario = inject(UsuarioServicio);

  ///localStorage
  sesioniniciada = signal<boolean>(localStorage.getItem('sesioniniciada') === 'true');



  // private auth = getAuth();


  //accdemos al rol del usuario
  rolActual = signal<string | null>(localStorage.getItem('rol'));

  login(email: string, password: string): Observable<boolean> {

    return this.servicioUsuario.getUsuarios().pipe(
      map(Usuarios => {
        const usuarioCoincide = Usuarios.find(u => u.email === email && u.password === password);
        if (usuarioCoincide) {
          localStorage.setItem('sesioniniciada', 'true');
          //guardar estos datos conviritiendo el objeto json a texto
          localStorage.setItem('usuario', JSON.stringify(usuarioCoincide));


          ///guardar el rol

          localStorage.setItem('rol', usuarioCoincide.rol);
          this.rolActual.set(usuarioCoincide.rol);

          this.sesioniniciada.set(true);
          return true;
        }
        return false;
      })
    )

    //signInWithEmailAndPassword(this.auth,email,password)
    //.then(respuesta => this.usuario =respuesta.user)
    //.catch(err => console.error('No puede iniciar sesion', err.message));

  }

  logout() {

    // signOut(this.auth);
    //this.usuario=null;
    localStorage.removeItem('sesioniniciada');
    localStorage.removeItem('usuario');

    //rolesxd
    localStorage.removeItem('rol');
    this.rolActual.set(null);
    this.sesioniniciada.set(false);
  }
  //rolesxd implementacion de guardianes

  getUsuarioActual() {
  return JSON.parse(localStorage.getItem('usuario') || 'null');
}

esAdmin(): boolean {
  return this.rolActual()?.toUpperCase() === 'ADMIN';
}

estaAutenticado(): boolean {
  return this.sesioniniciada();
}
}
