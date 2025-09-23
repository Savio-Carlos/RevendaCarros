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
import { ClienteComponent } from './components/layout/cliente/cliente.component';
import { ClienteMeusCarrosComponent } from './components/layout/cliente/clientemeuscarros/clientemeuscarros.component';
import { ClienteServicosComponent } from './components/layout/cliente/clienteservicos/clienteservicos.component';
import { ClienteAcessoriosComponent } from './components/layout/cliente/clienteacessorios/clienteacessorios.component';
import { HomeComponent } from './components/home/home.component';
import { CarrinhoComponent } from './components/layout/carrinho/carrinho.component';
import { GerenteclientesComponent } from './components/layout/gerente/gerenteclientes/gerenteclientes.component';
import { GerenteEquipeComponent } from './components/layout/gerente/gerenteequipe/gerenteequipe.component';
import { GerentedashboardComponent } from './components/layout/gerente/gerentedashboard/gerentedashboard.component';
import { VendasPendentesComponent } from './components/vendas/vendaspendentes/vendaspendentes.component';
import { NovaVendaComponent } from './components/vendas/nova-venda/nova-venda.component';
import { NovaVendaCarroComponent } from './components/vendas/nova-venda-carro/nova-venda-carro.component';
import { MecanicoHistoricoComponent } from './components/layout/mecanico/mecanico-historico/mecanico-historico.component';
import { MecanicoNovaOrdemComponent } from './components/layout/mecanico/mecanico-nova-ordem/mecanico-nova-ordem.component';
import { MecanicoServicosAbertosComponent } from './components/layout/mecanico/mecanico-servicos-abertos/mecanico-servicos-abertos.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: "", redirectTo: "principal", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "principal", component: PrincipalComponent, children: [
        {path: "", component: HomeComponent },
        {path: "carros", component: CarroslistComponent},
    {path: "carros/:chassi", component: CarrosdetailsComponent},
        {path: "pecas", component: PecaslistComponent},
        {path: "pecas/:id", component: PecasdetailsComponent},
        {path: "servicos", component: ServicoslistComponent},
        {path: "servicos/:id", component: ServicosdetailsComponent},
        {path: "carrinho", component: CarrinhoComponent}
    ]},
    {path: "gerente", 
        component: GerenteComponent, 
        canActivate: [authGuard], 
        data: { roles: ['gerente'] },
        children: [  
        { path: "", redirectTo: "dashboard", pathMatch: 'full' },
        { path: "estoque", component: VendedorpecasComponent },
        { path: "veiculos", component: VendedorcarrosComponent }, 
        { path: "clientes", component: GerenteclientesComponent },
        { path: "equipe", component: GerenteEquipeComponent },
        { path: "dashboard", component: GerentedashboardComponent },
        { path: "vendas", component: VendedorvendasComponent },
        { path: "vendas-pendentes", component: VendasPendentesComponent },
        { path: "nova-venda", component: NovaVendaComponent },
        { path: "nova-venda-carro", component: NovaVendaCarroComponent }
    ]},
    {path: "vendedor", 
        component: VendedorComponent, 
        canActivate: [authGuard],
        data: { roles: ['vendedor', 'gerente'] },
        children: [
        { path: "", redirectTo: "dashboard", pathMatch: 'full' },
        { path: "dashboard", component: VendedordashboardComponent },
        { path: "carros", component: VendedorcarrosComponent },
        { path: "pecas", component: VendedorpecasComponent },
        { path: "clientes", component: GerenteclientesComponent },
        { path: "vendas-pendentes", component: VendasPendentesComponent },
        { path: "vendas", component: VendedorvendasComponent },
        { path: "nova-venda", component: NovaVendaComponent },
        { path: "nova-venda-carro", component: NovaVendaCarroComponent }
    ]},
    {path: "mecanico", 
        component: MecanicoComponent, 
        canActivate: [authGuard],
        data: { roles: ['mecanico', 'gerente'] }, 
        children: [
        { path: "", redirectTo: "nova-ordem", pathMatch: 'full' },
        { path: "nova-ordem", component: MecanicoNovaOrdemComponent },
        { path: "servicos-abertos", component: MecanicoServicosAbertosComponent },
        { path: "historico", component: MecanicoHistoricoComponent },
    ]},
    {path: "cliente", 
        component: ClienteComponent, 
        canActivate: [authGuard],   
        data: { roles: ['cliente'] },
        children: [
        { path: "", redirectTo: "carros", pathMatch: 'full' },
        { path: "carros", component: ClienteMeusCarrosComponent },
        { path: "servicos", component: ClienteServicosComponent },
        { path: "acessorios", component: ClienteAcessoriosComponent },
    ]},
];
