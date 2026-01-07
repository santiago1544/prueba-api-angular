import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPokemonesComponent } from './lista-pokemones.component';

const routes: Routes = [{ path: '', component: ListaPokemonesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaPokemonesRoutingModule { }
