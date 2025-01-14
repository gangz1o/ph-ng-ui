import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { ButtonModule } from 'primeng/button'
import { FloatLabelModule } from 'primeng/floatlabel'
import { FluidModule } from 'primeng/fluid'
import { InputTextModule } from 'primeng/inputtext'
import { PanelModule } from 'primeng/panel'
import { ToggleSwitch } from 'primeng/toggleswitch'
import { forkJoin, Observable, tap } from 'rxjs'
import { Settings, SettingsName } from '../../constrants/settingsName'
import { GetSettingsService } from '../../core/services/get-settings.service'
@Component({
  selector: 'app-settings',
  imports: [
    PanelModule,
    TranslocoModule,
    ButtonModule,
    FluidModule,
    FloatLabelModule,
    InputTextModule,
    ToggleSwitch,
    ReactiveFormsModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  configForm!: FormGroup
  fb = inject(FormBuilder)
  getSettingsService = inject(GetSettingsService)
  ngOnInit(): void {
    this.configForm = this.fb.group({
      //PT Gen地址
      pt_gen_api_url: ['https://ptgen.agsvpt.work/', [Validators.required, Validators.pattern('https?://.+')]],
      //图床API地址
      picture_bed_api_url: ['https://pixhost.to/', [Validators.required, Validators.pattern('https?://.+')]],
      //图床API Token
      picture_bed_api_token: ['6d207e02198a847aa98d0a2a901485a5', [Validators.required]],
      //截图存储地址
      screenshot_storage_path: ['temp/pic', [Validators.required]],
      //种子存储地址
      torrent_storage_path: ['temp/torrent', [Validators.required]],
      //截图数量
      screenshot_number: [3, [Validators.required, Validators.min(1)]],
      //截图复杂度参数
      screenshot_threshold: [30.0, [Validators.required, Validators.min(0)]],
      //截图开始百分比
      screenshot_start_percentage: [0.1, [Validators.required, Validators.min(0)]],
      //截图结束百分比
      screenshot_end_percentage: [0.9, [Validators.required, Validators.min(0)]],
      // 是否自动上传截图
      auto_upload_screenshot: [true],
      // 是否粘贴截图URL到简介后
      paste_screenshot_url: [true],
      // 是否删除截图
      delete_screenshot: [true],
      // 是否启用媒体信息后缀
      media_info_suffix: [true],
    })

    const settingsObservable: Observable<Settings>[] = Object.values(SettingsName).map((settingsName) => {
      return this.getSettingsService.getSettings(settingsName)
    })

    forkJoin(settingsObservable).pipe(
      tap((settingsArray) => {
        settingsArray.forEach((settings, index) => {
          const settingName = Object.keys(settings)[0] as keyof Settings
          console.log('🍔🍟🥤 ~ settingName:', settingName)
          if (this.configForm.controls[settingName]) {
            console.log(settings[settingName])
            this.configForm.controls[settingName].setValue(settings[settingName])
          }
        })
      }),
    )
  }

  handleSubmitSettings() {
    console.log(this.configForm.value)
    if (this.configForm?.valid) {
      console.log(this.configForm.value)
    }
  }
}
