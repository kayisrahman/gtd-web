import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './pages/inbox/inbox.component'
import { OrganizeComponent } from './pages/organize/organize.component'
import { ContextsComponent } from './pages/contexts/contexts.component'

const routes: Routes = [
  {path: '', component: InboxComponent},
  {path: 'organize', component: OrganizeComponent},
  {path: 'next-actions', component: OrganizeComponent},
  {path: 'plan-more', component: OrganizeComponent},
  {path: 'waiting-for', component: OrganizeComponent},
  {path: 'contexts', component: ContextsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
