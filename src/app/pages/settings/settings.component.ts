import { Component } from '@angular/core'
import { TranslocoModule } from '@ngneat/transloco'
import { ButtonModule } from 'primeng/button'
import { PanelModule } from 'primeng/panel'
import { FooterComponent } from '../../core/layout/footer/footer.component'
@Component({
  selector: 'app-settings',
  imports: [PanelModule, TranslocoModule, ButtonModule, FooterComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
