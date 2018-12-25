import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MsalModule, MsalGuard, MsalInterceptor } from '@azure/msal-angular';

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

import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    LinksComponent,
    ShortnerComponent,
    LogsComponent,
    CreditsComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', component: ShortnerComponent, pathMatch: 'full',
        canActivate: [MsalGuard]
      },
      {
        path: 'links', component: LinksComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'credits', component: CreditsComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'log/:id', component: LogsComponent,
        canActivate: [MsalGuard]
      }
    ]),
    MsalModule.forRoot({
      clientID: '1023a461-77c7-4996-91e4-274400561485',
      authority: 'https://login.microsoftonline.com/222f3a7c-d45e-4818-9aa4-33d44420ec32',
      consentScopes: ["api://1023a461-77c7-4996-91e4-274400561485/links.add"],
      validateAuthority: true
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ChartsModule,
    NgxSpinnerModule,
    NgxChartsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
