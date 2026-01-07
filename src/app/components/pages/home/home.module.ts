import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PersonajesModule } from '@personajes/personajes.module';
import { PokemonesModule } from '../pokemones/pokemon.module';
import { HeaderComponent } from '@app/shared/components/header/header.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PersonajesModule,
    PokemonesModule
  ]
})
export class HomeModule { }
