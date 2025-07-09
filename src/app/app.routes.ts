import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarroslistComponent } from './components/carros/carroslist/carroslist.component';
import { CarrosdetailsComponent } from './components/carros/carrosdetails/carrosdetails.component';
import { PecaslistComponent } from './components/pecas/pecaslist/pecaslist.component';
import { ServicoslistComponent } from './components/servicos/servicoslist/servicoslist.component';
import { GerenteComponent } from './components/layout/gerente/gerente.component';
import { PecasdetailsComponent } from './components/pecas/pecasdetails/pecasdetails.component';
import { ServicosdetailsComponent } from './components/servicos/servicosdetails/servicosdetails.component';
import { VendedorComponent } from './components/layout/vendedor/vendedor.component';
import { VendedordashboardComponent } from './components/layout/vendedor/vendedordashboard/vendedordashboard.component';
import { VendedorcarrosComponent } from './components/layout/vendedor/vendedorcarros/vendedorcarros.component';
import { VendedorpecasComponent } from './components/layout/vendedor/vendedorpecas/vendedorpecas.component';
import { VendedorvendasComponent } from './components/layout/vendedor/vendedorvendas/vendedorvendas.component';
import { MecanicoComponent } from './components/layout/mecanico/mecanico.component';


export const routes: Routes = [
    {path: "", redirectTo: "principal", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "principal", component: PrincipalComponent, children: [
        {path: "carros", component: CarroslistComponent},
        {path: "carros/:id", component: CarrosdetailsComponent},
        {path: "pecas", component: PecaslistComponent},
        {path: "servicos", component: ServicoslistComponent}
    ]},
    {path: "gerente", component: GerenteComponent, children: [
        {path: "carros", component: CarroslistComponent},
        {path: "carros/new", component: CarrosdetailsComponent},
        {path: "carros/edit/:id", component: CarrosdetailsComponent},
        {path: "pecas", component: PecaslistComponent},
        {path: "pecas/new", component: PecaslistComponent},
        {path: "pecas/edit/:id", component: PecasdetailsComponent},
        {path: "servicos", component: ServicoslistComponent},
        {path: "servicos/new", component: ServicoslistComponent},
        {path: "servicos/edit/:id", component: ServicosdetailsComponent}
    ]},
    {path: "vendedor", component: VendedorComponent, children: [
        { path: "", redirectTo: "dashboard", pathMatch: 'full' },
        { path: "dashboard", component: VendedordashboardComponent },
        { path: "carros", component: VendedorcarrosComponent },
        { path: "pecas", component: VendedorpecasComponent },
        { path: "vendas", component: VendedorvendasComponent }
    ]},
    {path: "mecanico", component: MecanicoComponent, children: [
        {path: "carros", component: CarroslistComponent},
        {path: "carros/new", component: CarrosdetailsComponent},
        {path: "carros/edit/:id", component: CarrosdetailsComponent},
        {path: "pecas", component: PecaslistComponent},
        {path: "pecas/new", component: PecaslistComponent},
        {path: "pecas/edit/:id", component: PecasdetailsComponent},
        {path: "servicos", component: ServicoslistComponent},
        {path: "servicos/new", component: ServicoslistComponent},
        {path: "servicos/edit/:id", component: ServicosdetailsComponent}
    ]}
];
