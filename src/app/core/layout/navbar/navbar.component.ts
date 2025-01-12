import { Component, inject, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { translate, TranslocoModule, TranslocoService } from '@ngneat/transloco'
import { MenuItem } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { TieredMenuModule } from 'primeng/tieredmenu'
import { MenubarModule } from 'primeng/menubar'
import { CommonModule, DOCUMENT } from '@angular/common'
import { AvatarModule } from 'primeng/avatar'
@Component({
  imports: [
    ButtonModule,
    TranslocoModule,
    TieredMenuModule,
    MenubarModule,
    RouterModule,
    CommonModule,
    AvatarModule,
  ],
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
  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang)
  }

  langs = [
    {
      label: 'English',
      command: () => this.changeLang('en'),
    },
    {
      label: '简体中文',
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

  ngOnInit(): void {
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
}
