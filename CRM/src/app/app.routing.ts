
// CONFIGURACION DE TODAS LAS RUTAS QUE USEMOŠCON ANGULAR

import { Routes, RouterModule } from "@angular/router";

import { ModuleWithProviders } from "@angular/core"
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";

import { IndexColaboradorComponent } from "./components/colaborador/index-colaborador/index-colaborador.component";
import { CreateColaboradorComponent } from "./components/colaborador/create-colaborador/create-colaborador.component";
import { EditColaboradorComponent } from "./components/colaborador/edit-colaborador/edit-colaborador.component";

import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";
import { VerificarCuentaComponent } from "./components/verificar-cuenta/verificar-cuenta.component";
import { ProspeccionClienteComponent } from "./components/clientes/buyer/prospeccion-cliente/prospeccion-cliente.component";
import { DashboardClienteComponent } from "./components/clientes/buyer/dashboard-cliente/dashboard-cliente.component";
import { TareasClienteComponent } from "./components/clientes/buyer/prospeccion/tareas-cliente/tareas-cliente.component";
import { InteresesClienteComponent } from "./components/clientes/buyer/prospeccion/intereses-cliente/intereses-cliente.component";
import { LlamadasClienteComponent } from "./components/clientes/buyer/prospeccion/llamadas-cliente/llamadas-cliente.component";
import { CorreoClienteComponent } from "./components/clientes/buyer/prospeccion/correo-cliente/correo-cliente.component";

// CONSTANTE QUE CONTIENE TODAS LAS RUTAS DEL APLICATIVO

const appRoutes : Routes = [
    { path: 'dashboard', component : DashboardComponent },

    // RUTAS DE COLABORADOR
    { path: 'colaborador', component: IndexColaboradorComponent },
    { path: 'colaborador/create', component: CreateColaboradorComponent },
    { path: 'colaborador/:id', component: EditColaboradorComponent },

    // RUTAS DE CLIENTES
    { path: 'cliente', component: IndexClienteComponent },
    { path: 'cliente/create', component: CreateClienteComponent },
    { path: 'cliente/:id', component: EditClienteComponent },
    { path: 'cliente/buyer/:id/dashboard', component: DashboardClienteComponent },
    { path: 'cliente/buyer/:id/prospeccion', component: ProspeccionClienteComponent },
    // RUTAS DE CLIENTES | PROSPECCION
    { path: 'cliente/buyer/:id/prospeccion/intereses', component: InteresesClienteComponent },
    { path: 'cliente/buyer/:id/prospeccion/tareas', component: TareasClienteComponent },
    { path: 'cliente/buyer/:id/prospeccion/llamadas', component: LlamadasClienteComponent },
    { path: 'cliente/buyer/:id/prospeccion/correos', component: CorreoClienteComponent },

    // EXTRA | SEGURIDAD
    { path: 'verification/:token', component: VerificarCuentaComponent},

    { path: '', component: LoginComponent}
]

export const appRoutingProviders : any[] = [];

export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);