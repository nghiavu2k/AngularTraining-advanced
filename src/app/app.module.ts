import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './component/list/list.component';
import { FormComponent } from './component/form/form.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './component/update/update.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { PipeAndDirectiveComponent } from './component/pipe-and-directive/pipe-and-directive.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DirectiveComponent } from './component/directive/directive.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DebounceClickDirective } from './component/directive/debounce-click.directive';
import { HttpClientModule } from '@angular/common/http';
import { PetSaveComponent } from './pet-save/pet-save.component';
import { PetUpdateComponent } from './pet-update/pet-update.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { UnSavedChangesGuard } from './guards/un-saved-changes.guard';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    UpdateComponent,
    PipeAndDirectiveComponent,
    DirectiveComponent,
    DebounceClickDirective,
    PetListComponent,
    PetSaveComponent,
    PetUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UnSavedChangesGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
