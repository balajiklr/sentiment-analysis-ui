import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { AppLayoutModule } from './layout/app.layout.module';
import { AnalysisService } from './service/analysisservice';


@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule,ButtonModule,AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
         AnalysisService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}