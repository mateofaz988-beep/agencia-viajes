import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from '../../models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServicio {
  private http = inject(HttpClient);
  
  // ✅ URL CORRECTA de tu Firebase Realtime Database
  private API_URL = 'https://agencia-f362b-default-rtdb.firebaseio.com';

  /**
   * Obtener todos los usuarios
   */
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
        }),
        // ✅ Manejo de errores - CRÍTICO para que el observable complete
        catchError((error: HttpErrorResponse) => {
          console.error('❌ Error al obtener usuarios:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Crear nuevo usuario
   */
  postUsuario(usuario: Usuario): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `${this.API_URL}/usuarios.json`,
      usuario
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('❌ Error al crear usuario:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtener usuario por ID
   */
  getUsuarioById(id: string): Observable<Usuario | null> {
    return this.http.get<Usuario>(
      `${this.API_URL}/usuarios/${id}.json`
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('❌ Error al obtener usuario:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Actualizar usuario
   */
  putUsuario(id: string, usuario: Usuario): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/usuarios/${id}.json`,
      usuario
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('❌ Error al actualizar usuario:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Eliminar usuario
   */
  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/usuarios/${id}.json`
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('❌ Error al eliminar usuario:', error);
        return throwError(() => error);
      })
    );
  }
}