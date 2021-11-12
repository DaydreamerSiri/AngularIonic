import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'imagedisplay',
    pathMatch: 'full',
  },
  {
    path: 'imagedisplay',
    loadChildren: () => import('./imagedisplay/imagedisplay.module').then( m => m.ImagedisplayPageModule)
  },
  {
    path: 'musicgallery',
    loadChildren: () => import('./musicgallery/musicgallery.module').then( m => m.MusicgalleryPageModule)
  },
  {
    path: 'root-tree',
    loadChildren: () => import('./root-tree/root-tree.module').then( m => m.RootTreePageModule)
  },
  {
    path: 'httprequests',
    loadChildren: () => import('./httprequests/httprequests.module').then( m => m.HttprequestsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
