
// CONFIGURACION DE TODAS LAS RUTAS QUE USEMOŠCON ANGULAR

import { Routes, RouterModule } from "@angular/router";

import { ModuleWithProviders } from "@angular/core"
import { DashboardComponent } from "./components/dashboard/dashboard.component";

// CONSTANTE QUE CONTIENE TODAS LAS RUTAS DEL APLICATIVO

const appRoutes : Routes = [
    { path: 'dashboard', component : DashboardComponent }
]

export const appRoutingProviders : any[] = [];

export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);