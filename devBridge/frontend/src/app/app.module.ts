import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { ApolloModule } from 'apollo-angular';
import {FullCalendarModule} from "@fullcalendar/angular";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";

// Factory simplifiée sans injection de JwtHelperService
export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      if (!environment.production) {
        console.debug('JWT token retrieved from storage');
      }
      return localStorage.getItem('token');
    },
    allowedDomains: [new URL(environment.urlBackend).hostname],
    disallowedRoutes: [
      `${new URL(environment.urlBackend).origin}/users/login`
    ]
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    }),
    GraphQLModule,
    ApolloModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
