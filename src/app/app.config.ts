import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { GlobalErrorHandler } from './services/global-error-handler.service';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
        provideAnimations(),
        provideHttpClient(
            withInterceptors([httpErrorInterceptor])
        ),
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ]
};
