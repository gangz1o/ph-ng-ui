import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Settings, SettingsName } from '../../constrants/settingsName'

export interface SettingsModel {
  settingsName: SettingsName
  settingsData: string
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  http = inject(HttpClient)
  apiBaseUrl = environment.apiBaseUrl

  getSettings(settingsName: SettingsName): Observable<Settings> {
    return this.http.get<Settings>(`${this.apiBaseUrl}/getSettings?settingsName=${settingsName}`)
  }

  updateSettings(settingsName: SettingsName, settingsData: string) {
    return this.http.post<SettingsModel>(
      `${this.apiBaseUrl}/updateSettings?settingsName=${encodeURIComponent(settingsName)}&settingsData=${encodeURIComponent(settingsData)}`,
      null,
    )
  }
}
