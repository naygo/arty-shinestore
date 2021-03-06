import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './core/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { ProductsComponent } from './views/cliente/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';

import { AdminGuard } from './core/guards/admin.guard';
import { ClienteGuard } from './core/guards/cliente.guard';
import { ClientesComponent } from './views/admin/clientes/clientes.component';
import { CategoriasComponent } from './views/admin/categorias/categorias.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { ProdutosAdminComponent } from './views/admin/produtos-admin/produtos-admin.component';
import { EntregasComponent } from './views/admin/entregas/entregas.component';
import { ClienteEncomendasComponent } from './views/cliente/cliente-encomendas/cliente-encomendas.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [ LoginGuard ]

  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: NavbarComponent,
    canActivate: [ AuthGuard ],
    canActivateChild: [ AdminGuard ],
    children: [
      { path: 'inicio', component: HomeComponent },
      { path: 'produtos-admin', component: ProdutosAdminComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'encomendas', component: EntregasComponent }
    ]
  },
  {
    path: 'cliente',
    component: NavbarComponent,
    canActivate: [ AuthGuard ],
    canActivateChild: [ ClienteGuard ],
    children: [
      { path: 'inicio', component: HomeComponent },
      { path: 'produtos', component: ProductsComponent },
      { path: 'contato', component: ContactComponent },
      { path: 'encomendas', component: ClienteEncomendasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
