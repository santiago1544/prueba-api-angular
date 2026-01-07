import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DetallePokemonesComponent } from './detalle-pokemones/detalle-pokemones.component';
import { ListaPokemonesComponent } from './lista-pokemones/lista-pokemones.component';
import { PokemonComponent } from './pokemon.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';


const componentes = [
  DetallePokemonesComponent,
  ListaPokemonesComponent,
  PokemonComponent
]

@NgModule({
  declarations: [...componentes],
  imports: [CommonModule, RouterModule, MatTableModule,MatPaginatorModule,MatButtonModule],
  exports: [...componentes],
})
export class PokemonesModule { }

