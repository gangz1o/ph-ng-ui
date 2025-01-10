import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-root',
  imports: [ButtonModule, RouterModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'ph-ng-ui'
}
