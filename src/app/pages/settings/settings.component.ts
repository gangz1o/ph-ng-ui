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
  settingsName = SettingsName
  fb = inject(FormBuilder)
  getSettingsService = inject(GetSettingsService)
  ngOnInit(): void {
    this.configForm = this.fb.group({
      //PT Gen地址
      [SettingsName.PtGenApiUrl]: ['', [Validators.required, Validators.pattern('https?://.+')]],
      //图床API地址
      [SettingsName.PictureBedApiUrl]: ['', [Validators.required, Validators.pattern('https?://.+')]],
      //图床API Token
      [SettingsName.PictureBedApiToken]: ['', [Validators.required]],
      //截图存储地址
      [SettingsName.ScreenshotStoragePath]: ['', [Validators.required]],
      //种子存储地址
      [SettingsName.TorrentStoragePath]: ['', [Validators.required]],
      //截图数量
      [SettingsName.ScreenshotNumber]: ['', [Validators.required, Validators.min(1)]],
      //截图复杂度参数
      [SettingsName.ScreenshotThreshold]: ['', [Validators.required, Validators.min(0)]],
      //截图开始百分比
      [SettingsName.ScreenshotStartPercentage]: ['', [Validators.required, Validators.min(0)]],
      //截图结束百分比
      [SettingsName.ScreenshotEndPercentage]: ['', [Validators.required, Validators.min(0)]],
      // 是否自动上传截图
      [SettingsName.AutoUploadScreenshot]: [false],
      // 是否粘贴截图URL到简介后
      [SettingsName.PasteScreenshotUrl]: [false],
      // 是否删除截图
      [SettingsName.DeleteScreenshot]: [false],
      // 是否启用媒体信息后缀
      [SettingsName.MediaInfoSuffix]: [false],
      // 生成缩略图
      [SettingsName.DoGetThumbnail]: [false],
      // 横向数量
      [SettingsName.ThumbnailRows]: [3, [Validators.required, Validators.min(3)]],
      // 纵向数量
      [SettingsName.ThumbnailCols]: [3, [Validators.required, Validators.min(3)]],
      // 上传延迟
      [SettingsName.ThumbnailDelay]: [0, [Validators.required, Validators.min(0)]],
      // 是否重命名文件
      [SettingsName.RenameFile]: [false],
      // 是否给电影文件创建同名文件夹
      [SettingsName.MakeDir]: [false],
      // 是否二次确认文件名
      [SettingsName.SecondConfirmFileName]: [false],
      //  Auto Feed链接格式
      [SettingsName.AutoFeedLink]: ['', [Validators.required]],
      // 是否自动打开Auto Feed链接
      [SettingsName.OpenAutoFeedLink]: [false],
    })

    const settingsObservable: Observable<Settings>[] = Object.values(SettingsName).map((settingsName) => {
      console.log('🍔🍟🥤 ~ settingsName:', settingsName)
      return this.getSettingsService.getSettings(settingsName)
    })

    forkJoin(settingsObservable)
      .pipe(
        tap((settingsArray) => {
          settingsArray.forEach((response, index) => {
            const settingName = Object.values(SettingsName)[index]
            const settingsData = response['data']?.settingsData
            console.log('🍔🍟🥤 ~ settingsData:', settingsData)
            if (settingsData && this.configForm.controls[settingName]) {
              //处理一下后端传来的布尔值
              const value = this.normalizeValue(settingsData)
              this.configForm.controls[settingName].setValue(value)
            }
          })
        }),
      )
      .subscribe()
  }
  //处理一下后端传来的布尔值
  normalizeValue = (value: any): any => {
    switch (value) {
      case 'True':
      case 'true':
        return true
      case 'False':
      case 'false':
        return false
      default:
        return value
    }
  }

  handleSubmitSettings() {
    if (this.configForm?.valid) {
      console.log(this.configForm.value)
    }
  }
}
