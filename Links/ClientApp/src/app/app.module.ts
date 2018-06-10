import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthenticationGuard, MsAdalAngular6Module } from 'microsoft-adal-angular6';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LinksComponent } from './links/links.component';
import { ShortnerComponent } from './shortner/shortner.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

import { AuthService } from './services/auth/auth.service';
//import { AuthGuardService } from './services/auth-guard/auth-guard.service';
//import { Adal5Service, Adal5HTTPService } from 'adal-angular5';
//import { HttpClient } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LinksComponent,
    ShortnerComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      // { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '', component: ShortnerComponent, pathMatch: 'full', canActivate: [AuthenticationGuard] },
      // { path: 'counter', component: CounterComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
      // { path: 'links', component: LinksComponent, canActivate: [AuthGuardService] },
      { path: 'links', component: LinksComponent, canActivate: [AuthenticationGuard] },
      // { path: 'shortner', component: ShortnerComponent },
      { path: 'auth-callback', component: AuthCallbackComponent }
    ]),
    MsAdalAngular6Module.forRoot({
      tenant: '222f3a7c-d45e-4818-9aa4-33d44420ec32',
      clientId: '69283aab-51de-414d-958b-22923a9c22d9',
      redirectUri: window.location.origin,
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage'
    })
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
