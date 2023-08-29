import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IMaskModule } from 'angular-imask';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import {provideFirestore, getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';


import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DisountsInfoComponent } from './pages/about-us/disounts-info/disounts-info.component';

import { DiscountsComponent } from './pages/about-us/discounts/discounts.component';
import { DeliveryAndPaymentComponent } from './pages/about-us/delivery-and-payment/delivery-and-payment.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProductsComponent } from './admin/products/products.component';

import { AuthComponent } from './pages/auth/auth.component';

import { MainComponent } from './pages/cabinet/main/main.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { ChangePassComponent } from './pages/cabinet/change-pass/change-pass.component';
import { OrderListComponent } from './pages/cabinet/order-list/order-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { RegComponent } from './pages/auth/reg/reg.component';
import { SharedModule } from './shared/shared.module';
import { AdminAuthComponent } from './pages/auth/admin-auth/admin-auth.component';
import { ProductModule } from './pages/product/product.module';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { PhoningComponent } from './pages/phoning/phoning.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminDiscountsComponent,
    AdminCategoriesComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DisountsInfoComponent,
    DiscountsComponent,
    DeliveryAndPaymentComponent,
    AboutUsComponent,
    ProductsComponent,
    AuthComponent,
    MainComponent,
    CheckOutComponent,
    ChangePassComponent,
    OrderListComponent,
    RegComponent,
    AdminAuthComponent,
    PhoningComponent

  ],
  imports: [
    FirestoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    IMaskModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(()=>getFirestore()),
    provideAuth(()=>getAuth()),
    BrowserAnimationsModule,
    SharedModule,
    ProductModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
