import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from '../../models/usuario/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServicio {

  private http = inject(HttpClient);
  private API_URL = 'https://productos-1f199-default-rtdb.firebaseio.com';

  getUsuarios(): Observable<Usuario[]> {
    return this.http
      .get<{ [key: string]: Usuario }>(`${this.API_URL}/usuarios.json`)
      .pipe(
        map(respuesta => {
          if (!respuesta) return [];

          return Object.keys(respuesta).map(id => ({
            ...respuesta[id],
            id
          }));
        })
      );
  }

  postUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      `${this.API_URL}/usuarios.json`,
      usuario
    );
  }

  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.API_URL}/usuarios/${id}.json`
    );
  }

  putUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.API_URL}/usuarios/${id}.json`,
      usuario
    );
  }

  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/usuarios/${id}.json`
    );
  }
}