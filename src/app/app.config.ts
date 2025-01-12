import { provideHttpClient, withFetch } from '@angular/common/http'
import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router'
import { provideTransloco } from '@ngneat/transloco'
import Aura from '@primeng/themes/aura'
import { providePrimeNG } from 'primeng/config'
import { AppRoutes } from './app.routes'
import { TranslocoHttpLoader } from './transloco-loader'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      AppRoutes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
    ),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    provideTransloco({
      config: {
        availableLangs: ['en', 'zh-CN'],
        defaultLang: 'zh-CN',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
}
