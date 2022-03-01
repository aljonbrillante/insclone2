import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavFormComponent } from './components/nav-form/nav-form.component';
import { HomeAccntHeaderComponent } from './components/home-accnt-header/home-accnt-header.component';
import { HomeAccntBodyComponent } from './components/home-accnt-body/home-accnt-body.component';
import { HomeAccntCommentsComponent } from './components/home-accnt-comments/home-accnt-comments.component';
import { FilterComponent } from './filter/filter/filter.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    NavFormComponent, HomeAccntHeaderComponent, HomeAccntBodyComponent, HomeAccntCommentsComponent,FilterComponent
  ],
  imports: [
    CommonModule,IonicModule
  ],
  exports: [
    NavFormComponent,HomeAccntHeaderComponent, HomeAccntBodyComponent, HomeAccntCommentsComponent,FilterComponent
  ]
})
export class SharedModule { }
