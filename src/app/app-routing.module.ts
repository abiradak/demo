import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path: "", redirectTo: "register", pathMatch: 'full'},
  { path: "register",  component: RegisterComponent},
  { path: "list",  component: ListComponent},
  { path: "edit/:name",  component: EditComponent},
  { path: "view/:email",  component: ViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
