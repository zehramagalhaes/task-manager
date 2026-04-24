import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from './app.routes';

/**
 * Main application configuration.
 * Configures providers for routing, HTTP client, and other global services.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(
      // Add interceptors here if needed
      // withInterceptors([loggingInterceptor, errorHandlingInterceptor])
    ),
  ],
};
