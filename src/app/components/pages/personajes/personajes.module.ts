import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DetallePersonajesComponent } from '@personajes/detalle-personajes/detalle-personajes.component';
import { ListaPersonajesComponent } from '@personajes/lista-personajes/lista-personajes.component';
import { PersonajeComponent } from '@personajes/personaje.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';


const componentes = [
  DetallePersonajesComponent,
  ListaPersonajesComponent,
  PersonajeComponent
]

@NgModule({
  declarations: [...componentes],
  imports: [CommonModule, RouterModule, MatTableModule,MatPaginatorModule,MatButtonModule],
  exports: [...componentes],
})
export class PersonajesModule { }

