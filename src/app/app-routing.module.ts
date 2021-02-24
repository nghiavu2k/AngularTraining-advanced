import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './component/form/form.component';
import { ListComponent } from './component/list/list.component';
import { UpdateComponent } from './component/update/update.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetSaveComponent } from './pet-save/pet-save.component';
import { PetUpdateComponent } from './pet-update/pet-update.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'form', component: FormComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'pet', component: PetListComponent },
  { path: 'pet-save', component: PetSaveComponent },
  { path: 'pet-update/:id', component: PetUpdateComponent },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./component/category/category.module').then(
        (m) => m.CategoryModule
      ),
  },
  { path: 'tags', loadChildren: () => import('./component/tags/tags.module').then(m => m.TagsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
