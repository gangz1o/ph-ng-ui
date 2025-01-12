import { Routes } from '@angular/router'
import { LayoutComponent } from './core/layout/layout.component'

export const AppRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then(
            (m) => m.SettingsComponent,
          ),
      },
      {
        path: 'movies',
        loadComponent: () =>
          import('./pages/movies/movies.component').then(
            (m) => m.MoviesComponent,
          ),
      },
      {
        path: 'series',
        loadComponent: () =>
          import('./pages/series/series.component').then(
            (m) => m.SeriesComponent,
          ),
      },
      {
        path: 'dramas',
        loadComponent: () =>
          import('./pages/dramas/dramas.component').then(
            (m) => m.DramasComponent,
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
]
