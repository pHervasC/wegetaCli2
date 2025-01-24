import { Routes } from '@angular/router';

import { UsuarioPlistComponent } from './components/usuario/usuario.plist/usuario.plist.component';
import { UsuarioEditComponent } from './components/usuario/usuario.edit/usuario.edit.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario.delete/usuario.delete.component';
import { UsuarioViewComponent } from './components/usuario/usuario.view/usuario.view.component';
import { SharedHomeRoutedComponent } from './shared/shared.home.routed/shared.home.routed.component';
import { UsuarioCreateComponent } from './components/usuario/usuario.create/usuario.create.component';
import { SharedLoginRoutedComponent } from './shared/shared.login.routed/shared.login.routed';


export const routes: Routes = [
    
    { path: '', component: SharedHomeRoutedComponent },
    { path: 'home', component: SharedHomeRoutedComponent },
    { path: 'login', component: SharedLoginRoutedComponent },


    { path: 'admin/usuario/plist', component: UsuarioPlistComponent},
    { path: 'admin/usuario/edit/:id', component: UsuarioEditComponent, },
    { path: 'admin/usuario/view/:id', component: UsuarioViewComponent, },
    { path: 'admin/usuario/create', component: UsuarioCreateComponent, pathMatch: 'full', },
    { path: 'admin/usuario/delete/:id', component: UsuarioDeleteComponent, },





];
