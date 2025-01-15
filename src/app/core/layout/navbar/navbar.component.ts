import { CommonModule, DOCUMENT } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { TranslocoModule, TranslocoService } from '@ngneat/transloco'
import { MenuItem } from 'primeng/api'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { MenubarModule } from 'primeng/menubar'
import { TieredMenuModule } from 'primeng/tieredmenu'

@Component({
  imports: [ButtonModule, TranslocoModule, TieredMenuModule, MenubarModule, RouterModule, CommonModule, AvatarModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  translocoService = inject(TranslocoService)
  router = inject(Router)
  #document = inject(DOCUMENT)
  isDarkMode = false
  items: MenuItem[] | undefined

  ngOnInit(): void {
    // 从本地存储中获取上次选择的语言
    const savedLang = localStorage.getItem('selectedLanguage')
    if (savedLang) {
      this.translocoService.setActiveLang(savedLang)
    }
    this.items = [
      {
        label: 'header.home',
        icon: 'pi pi-home',
        route: '/',
      },
      {
        label: 'header.settings',
        icon: 'pi pi-cog',
        route: '/settings',
      },
      {
        label: 'header.sources',
        icon: 'pi pi-objects-column',
        items: [
          {
            label: 'sources.movies',
            icon: 'pi pi-video',
            route: '/movies',
          },
          {
            label: 'sources.series',
            icon: 'pi pi-desktop',
            route: '/series',
          },
          {
            label: 'sources.dramas',
            icon: 'pi pi-play-circle',
            route: '/dramas',
          },
        ],
      },
    ]
  }

  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang)
    // 将选择的语言保存到本地存储
    localStorage.setItem('selectedLanguage', lang)
  }

  langs = [
    {
      label: '🇺🇸 English',
      command: () => this.changeLang('en'),
    },
    {
      label: '🇨🇳 简体中文',
      command: () => this.changeLang('zh-CN'),
    },
  ]

  userMenuItems: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ]

  logout() {
    // Add your logout logic here
    console.log('User logged out')
    this.router.navigate(['/login'])
  }
}
