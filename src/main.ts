import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ApplicationRef, EnvironmentProviders, Provider } from '@angular/core';
import { routes } from './app/routes';
import { PreloadAllModules ,provideRouter, withDebugTracing, withPreloading } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

const providers: Array<Provider | EnvironmentProviders> = [
  provideRouter(routes , withDebugTracing(),withPreloading(PreloadAllModules)),
  provideHttpClient()
];
const loadApplication = (application : ApplicationRef) => {
console.info(application);
};
bootstrapApplication(AppComponent,{providers} ).then(item => loadApplication);