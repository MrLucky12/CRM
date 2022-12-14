
// CONFIGURACION DE TODAS LAS RUTAS QUE USEMOŠCON ANGULAR

import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core"

// RUTA PRINCIPAL
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { VerificarCuentaComponent } from "./components/verificar-cuenta/verificar-cuenta.component";

// RUTAS DE COLABORADOR
import { IndexColaboradorComponent } from "./components/colaborador/index-colaborador/index-colaborador.component";
import { CreateColaboradorComponent } from "./components/colaborador/create-colaborador/create-colaborador.component";
import { EditColaboradorComponent } from "./components/colaborador/edit-colaborador/edit-colaborador.component";

// RUTAS DE CLIENTES
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";

// RUTAS DE CLIENTES | PROSPECCION
import { ProspeccionClienteComponent } from "./components/clientes/buyer/prospeccion-cliente/prospeccion-cliente.component";
import { DashboardClienteComponent } from "./components/clientes/buyer/dashboard-cliente/dashboard-cliente.component";
import { TareasClienteComponent } from "./components/clientes/buyer/prospeccion/tareas-cliente/tareas-cliente.component";
import { InteresesClienteComponent } from "./components/clientes/buyer/prospeccion/intereses-cliente/intereses-cliente.component";
import { LlamadasClienteComponent } from "./components/clientes/buyer/prospeccion/llamadas-cliente/llamadas-cliente.component";
import { CorreoClienteComponent } from "./components/clientes/buyer/prospeccion/correo-cliente/correo-cliente.component";

// RUTAS DE CURSOS
import { IndexCursoComponent } from "./components/curso/index-curso/index-curso.component";
import { CreateCursoComponent } from "./components/curso/create-curso/create-curso.component";
import { EditCursoComponent } from "./components/curso/edit-curso/edit-curso.component";
import { IndexCicloComponent } from "./components/ciclo/index-ciclo/index-ciclo.component";
import { CreateCicloComponent } from "./components/ciclo/create-ciclo/create-ciclo.component";
import { VencidasCicloComponent } from "./components/ciclo/vencidas-ciclo/vencidas-ciclo.component";
import { EditCicloComponent } from "./components/ciclo/edit-ciclo/edit-ciclo.component";
import { IndexMatriculaComponent } from "./components/matricula/index-matricula/index-matricula.component";
import { CreateMatriculaComponent } from "./components/matricula/create-matricula/create-matricula.component";


// CONSTANTE QUE CONTIENE TODAS LAS RUTAS DEL APLICATIVO

const appRoutes : Routes = [

    // RUTA PRINCIPAL
    { path: 'dashboard', component : DashboardComponent },
    { path: 'verification/:token', component: VerificarCuentaComponent},
    { path: '', component: LoginComponent},

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

    // RUTAS DE CURSOS
    { path: 'curso', component: IndexCursoComponent },
    { path: 'curso/create', component: CreateCursoComponent },
    { path: 'curso/:id', component: EditCursoComponent },

    // RUTAS DE CICLOS
    { path: 'curso/:id/ciclo', component: IndexCicloComponent },
    { path: 'curso/:id/ciclo/create', component: CreateCicloComponent },
    { path: 'curso/:id/ciclo/vencido', component: VencidasCicloComponent },
    { path: 'curso/:id/ciclo/edit/:idciclo', component: EditCicloComponent },

    // RUTA DE MATRICULAS
    { path: 'matricula', component: IndexMatriculaComponent },
    { path: 'matricula/create', component: CreateMatriculaComponent },
]

export const appRoutingProviders : any[] = [];

export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);