import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { LoadingComponent } from './core/components/loading/loading.component'

@Component({
  selector: 'app-root',
  imports: [ButtonModule, RouterModule, LoadingComponent],
  template: `
    <app-loading />
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'ph-ng-ui'
}
