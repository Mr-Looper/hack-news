import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFound } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
    { path: 'news', component: NewsComponent },
  { path: '404', component: PageNotFound },
  { path: '**', pathMatch: 'full', component: PageNotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }