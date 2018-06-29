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
import { LinksComponent } from './links/links.component';
import { ShortnerComponent } from './shortner/shortner.component';
import { LogsComponent } from './logs/logs.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CreditsComponent } from './credits/credits.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent, 
    LinksComponent,
    ShortnerComponent,
    LogsComponent,
    CreditsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([      
      { path: '', component: ShortnerComponent, pathMatch: 'full', canActivate: [AuthenticationGuard] },      
      { path: 'links', component: LinksComponent, canActivate: [AuthenticationGuard] },
      { path: 'credits', component: CreditsComponent, canActivate: [AuthenticationGuard] },
      { path: 'log/:id', component: LogsComponent, canActivate: [AuthenticationGuard] }
      // { path: 'shortner', component: ShortnerComponent }, 
    ]),
    MsAdalAngular6Module.forRoot({
      tenant: '222f3a7c-d45e-4818-9aa4-33d44420ec32',
      //clientId: '69283aab-51de-414d-958b-22923a9c22d9',
      clientId: '1023a461-77c7-4996-91e4-274400561485',
      redirectUri: window.location.origin,
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage'
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
