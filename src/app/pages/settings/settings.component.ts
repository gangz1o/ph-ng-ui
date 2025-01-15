import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslocoModule, TranslocoService } from '@ngneat/transloco'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { FloatLabelModule } from 'primeng/floatlabel'
import { FluidModule } from 'primeng/fluid'
import { InputTextModule } from 'primeng/inputtext'
import { PanelModule } from 'primeng/panel'
import { ToastModule } from 'primeng/toast'
import { ToggleSwitch } from 'primeng/toggleswitch'
import { catchError, concatMap, EMPTY, finalize, forkJoin, from, Observable, tap } from 'rxjs'
import { Settings, SettingsName } from '../../constrants/settingsName'
import { SettingsService } from '../../core/services/settings.service'

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
    ToastModule,
    CommonModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  providers: [MessageService],
})
export class SettingsComponent implements OnInit {
  configForm!: FormGroup
  settingsName = SettingsName
  generalCollapsed = true
  moviesCollapsed = true
  seriesCollapsed = true
  dramasCollapsed = true
  private fb = inject(FormBuilder)
  private messageService = inject(MessageService)
  private settingsService = inject(SettingsService)
  private transloco = inject(TranslocoService)

  ngOnInit(): void {
    this.loadSettings()
  }

  private loadSettings() {
    // 初始化表单
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
      [SettingsName.ThumbnailRows]: [3, [Validators.required, Validators.min(1)]],
      // 纵向数量
      [SettingsName.ThumbnailCols]: [3, [Validators.required, Validators.min(1)]],
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
      // 电影主标题
      [SettingsName.MainTitleMovie]: ['', [Validators.required]],
      // 电影副标题
      [SettingsName.SecondTitleMovie]: ['', [Validators.required]],
      // 电影文件名
      [SettingsName.FileNameMovie]: ['', [Validators.required]],
      // 电视剧主标题
      [SettingsName.MainTitleTv]: ['', [Validators.required]],
      // 电视剧副标题
      [SettingsName.SecondTitleTv]: ['', [Validators.required]],
      // 电视剧文件名
      [SettingsName.FileNameTv]: ['', [Validators.required]],
      // 短剧主标题
      [SettingsName.MainTitlePlaylet]: ['', [Validators.required]],
      // 短剧副标题
      [SettingsName.SecondTitlePlaylet]: ['', [Validators.required]],
      // 短剧文件名
      [SettingsName.FileNamePlaylet]: ['', [Validators.required]],
    })

    const settingsObservable: Observable<Settings>[] = Object.values(SettingsName).map((settingsName) => {
      return this.settingsService.getSettings(settingsName)
    })

    forkJoin(settingsObservable)
      .pipe(
        tap((settingsArray) => {
          settingsArray.forEach((response, index) => {
            const settingName = Object.values(SettingsName)[index]
            const settingsData = response['data']?.settingsData
            if (settingsData && this.configForm.controls[settingName]) {
              //处理一下后端传来的布尔值
              const value = this._normalizeValue(settingsData)
              this.configForm.patchValue({
                [settingName]: value,
              })
              this.configForm.controls[settingName].markAsPristine()
            }
          })
        }),
      )
      .subscribe()
  }

  //处理一下后端传来的布尔值
  private _normalizeValue = (value: any): any => {
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

  private getSettingTranslationKey(settingName: string): string {
    // 根据设置名称确定翻译路径
    if (settingName.includes('Movie')) {
      return `moviesSettings.${this.camelToSnakeCase(settingName)}`
    } else if (settingName.includes('Tv')) {
      return `seriesSettings.${this.camelToSnakeCase(settingName)}`
    } else if (settingName.includes('Playlet')) {
      return `dramasSettings.${this.camelToSnakeCase(settingName)}`
    } else {
      return `generalSettings.${this.camelToSnakeCase(settingName)}`
    }
  }

  private camelToSnakeCase(str: string): string {
    return str
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase()
  }

  toggleGeneral() {
    this.generalCollapsed = !this.generalCollapsed
  }

  toggleMovies() {
    this.moviesCollapsed = !this.moviesCollapsed
  }

  toggleSeries() {
    this.seriesCollapsed = !this.seriesCollapsed
  }

  toggleDramas() {
    this.dramasCollapsed = !this.dramasCollapsed
  }

  handleSubmitSettings(configForm: FormGroup) {
    const changedForm = Object.keys(configForm.controls).reduce(
      (acc, key) => {
        if (configForm.controls[key].dirty) {
          acc[key] = configForm.controls[key].value
        }
        return acc
      },
      {} as { [key: string]: any },
    )

    // 如果没有修改，直接提示并返回
    if (Object.keys(changedForm).length === 0) {
      this.messageService.add({
        key: 'br',
        severity: 'info',
        summary: this.transloco.translate('messageService.info'),
        detail: this.transloco.translate('messageService.noChanges'),
      })
      return
    }

    // 将对象转换为数组并串行处理
    const updates = Object.entries(changedForm).map(([key, value]) => {
      return {
        key: key as SettingsName,
        value,
      }
    })

    // 记录成功和失败的更新
    const successUpdates: string[] = []
    const failedUpdates: string[] = []

    // 使用 concat 操作符串行处理请求
    from(updates)
      .pipe(
        concatMap((update) =>
          this.settingsService.updateSettings(update.key, update.value).pipe(
            tap(() => {
              successUpdates.push(update.key)
            }),
            catchError((error) => {
              failedUpdates.push(update.key)
              this.messageService.add({
                key: 'br',
                severity: 'error',
                summary: this.transloco.translate('settings.updateError'),
                detail: `${this.transloco.translate(this.getSettingTranslationKey(update.key))}: ${error.message}`,
              })
              return EMPTY
            }),
          ),
        ),
        finalize(() => {
          // 如果有成功的更新
          if (successUpdates.length > 0) {
            this.messageService.add({
              key: 'br',
              severity: 'success',
              summary: this.transloco.translate('messageService.successTitle'),
              detail: successUpdates
                .map((key) => this.transloco.translate(this.getSettingTranslationKey(key)))
                .join('\n '),
              life: 5000,
            })
            // 标记成功更新的控件为pristine
            successUpdates.forEach((key) => {
              this.configForm.get(key)?.markAsPristine()
            })
          }

          // 如果有失败的更新
          if (failedUpdates.length > 0) {
            this.messageService.add({
              key: 'br',
              severity: 'error',
              summary: this.transloco.translate('messageService.errorTitle'),
              detail: failedUpdates
                .map((key) => this.transloco.translate(this.getSettingTranslationKey(key)))
                .join(', '),
              life: 5000,
            })
          }
        }),
      )
      .subscribe()
  }
}
