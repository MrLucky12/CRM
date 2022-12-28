import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http";
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTinymceModule } from 'ngx-tinymce';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { routing } from './app.routing';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { TopComponent } from './components/top/top.component';

import { IndexColaboradorComponent } from './components/colaborador/index-colaborador/index-colaborador.component';
import { CreateColaboradorComponent } from './components/colaborador/create-colaborador/create-colaborador.component';
import { EditColaboradorComponent } from './components/colaborador/edit-colaborador/edit-colaborador.component';

import { NotfoundComponent } from './components/notfound/notfound.component';

import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { VerificarCuentaComponent } from './components/verificar-cuenta/verificar-cuenta.component';
import { DashboardClienteComponent } from './components/clientes/buyer/dashboard-cliente/dashboard-cliente.component';
import { ProspeccionClienteComponent } from './components/clientes/buyer/prospeccion-cliente/prospeccion-cliente.component';
import { AsideClienteComponent } from './components/clientes/buyer/aside-cliente/aside-cliente.component';
import { InteresesClienteComponent } from './components/clientes/buyer/prospeccion/intereses-cliente/intereses-cliente.component';
import { TareasClienteComponent } from './components/clientes/buyer/prospeccion/tareas-cliente/tareas-cliente.component';
import { LlamadasClienteComponent } from './components/clientes/buyer/prospeccion/llamadas-cliente/llamadas-cliente.component';
import { CorreoClienteComponent } from './components/clientes/buyer/prospeccion/correo-cliente/correo-cliente.component';
import { IndexCursoComponent } from './components/curso/index-curso/index-curso.component';
import { CreateCursoComponent } from './components/curso/create-curso/create-curso.component';
import { EditCursoComponent } from './components/curso/edit-curso/edit-curso.component';
import { IndexCicloComponent } from './components/ciclo/index-ciclo/index-ciclo.component';
import { CreateCicloComponent } from './components/ciclo/create-ciclo/create-ciclo.component';
import { VencidasCicloComponent } from './components/ciclo/vencidas-ciclo/vencidas-ciclo.component';
import { EditCicloComponent } from './components/ciclo/edit-ciclo/edit-ciclo.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    TopComponent,
    
    IndexColaboradorComponent,
    CreateColaboradorComponent,
    EditColaboradorComponent,
    
    NotfoundComponent,
    
    IndexClienteComponent,
    EditClienteComponent,
    CreateClienteComponent,
    VerificarCuentaComponent,
    DashboardClienteComponent,
    ProspeccionClienteComponent,
    AsideClienteComponent,
    InteresesClienteComponent,
    TareasClienteComponent,
    LlamadasClienteComponent,
    CorreoClienteComponent,
    IndexCursoComponent,
    CreateCursoComponent,
    EditCursoComponent,
    IndexCicloComponent,
    CreateCicloComponent,
    VencidasCicloComponent,
    EditCicloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbModule,
    NgxTinymceModule.forRoot({
      //OBTENER LOS RECURSOS DE MANERA LOCAL
      baseURL: '../../../assets/tinymce/',
      // or cdn
      //OBTENER LOS RECURSOS A UN SERVIDOR EXTERNO
      // baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
