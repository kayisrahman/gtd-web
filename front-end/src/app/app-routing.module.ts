import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './pages/inbox/inbox.component'
import { OrganizeComponent } from './pages/organize/organize.component'

const routes: Routes = [
  {path: '', component: InboxComponent},
  {path: 'organize', component: OrganizeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
