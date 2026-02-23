import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { CatalogoComponent } from './pages/catalogo/catalogo';
import { GestionComponent } from './pages/gestion/gestion';
import { NosotrosComponent } from './pages/nosotros/nosotros';
import { ContactanosComponent } from './pages/contactanos/contactanos';

import { Login } from './shared/login/login';
import { FormularioCuenta } from './shared/formulario-cuenta/formulario-cuenta';
import { clienteSoloLoginGuard } from './guards/cliente-solo-login-guard-guard';
import { sesionActivaGuard } from './guards/sesion-activa-guard-guard';
import { Admin } from './pages/admin/admin';
import { adminGuard } from './guards/admin-guard-guard';

// ✅ 1. Importa el componente de Error 404
import { Error404Component } from './pages/error404/error404';

export const routes: Routes = [

  { path: '', component: HomeComponent },

  { 
    path: 'catalogo', 
    component: CatalogoComponent,
    canActivate: [adminGuard]  // ✅ Corregido: canMatch → canActivate
  },
  
  { 
    path: 'gestion', 
    component: GestionComponent,
    canActivate: [sesionActivaGuard]
  },

  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contactanos', component: ContactanosComponent },

  {
    path: 'login',
    component: Login,
    canActivate: [clienteSoloLoginGuard]
  },
  
  { 
    path: 'admin', 
    component: Admin,
    canActivate: [adminGuard]  // ✅ Agregado guard para seguridad
  },

  { path: 'formulariocuenta', component: FormularioCuenta },
  
  // ✅ 2. Ruta 404 - DEBE IR AL FINAL (después de todas las rutas)
  { path: '**', component: Error404Component }

];