import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadChildren: () =>
    import(
      './components/pages/home/home.module'
    ).then(m => m.HomeModule)
  },
  {
    path: 'lista_personajes',
    loadChildren: () =>
    import(
      './components/pages/personajes/lista-personajes/lista-personajes.module'
    ).then(m => m.ListaPersonajesModule)
  },
  {
    path: 'detalle_personajes/:id',
    loadChildren: () =>
    import(
      './components/pages/personajes/detalle-personajes/detalle-personajes.module'
    ).then(m => m.DetallePersonajesModule)
  },
  {
    path: 'lista_pokemones',
    loadChildren: () =>
    import(
      './components/pages/pokemones/lista-pokemones/lista-pokemones.module'
    ).then(m => m.ListaPokemonesModule)
  },
  {
    path: 'detalle_pokemones/:id',
    loadChildren: () =>
    import(
      './components/pages/pokemones/detalle-pokemones/detalle-pokemones.module'
    ).then(m => m.DetallePokemonesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
