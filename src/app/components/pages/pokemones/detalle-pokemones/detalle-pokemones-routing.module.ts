import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallePokemonesComponent } from './detalle-pokemones.component';

const routes: Routes = [{ path: '', component: DetallePokemonesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetallePokemonesRoutingModule { }
