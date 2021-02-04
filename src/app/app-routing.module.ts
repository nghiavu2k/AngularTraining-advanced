import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './component/form/form.component';
import { ListComponent } from './component/list/list.component';
import { UpdateComponent } from './component/update/update.component';

export const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'form', component: FormComponent},
  {path: 'update/:id', component: UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
