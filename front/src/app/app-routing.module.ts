import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NewsComponent } from './components/news/news.component';


const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'news', component: NewsComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
