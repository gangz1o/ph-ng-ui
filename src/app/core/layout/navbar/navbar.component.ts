import { Component, inject, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TranslocoModule, TranslocoService } from '@ngneat/transloco'
import { ButtonModule } from 'primeng/button'
import { TieredMenu } from 'primeng/tieredmenu'

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, TranslocoModule, TieredMenu],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  translocoService = inject(TranslocoService)
  router = inject(Router)

  changeLang(lang: string) {
    console.log('🍔🍟🥤 ~ lang:', lang)
    this.translocoService.setActiveLang(lang)
  }

  langs = [
    { label: 'English', command: () => this.changeLang('en') },
    { label: '简体中文', command: () => this.changeLang('zh-CN') },
  ]
}
