import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Settings, SettingsName } from '../../constrants/settingsName'

@Injectable({
  providedIn: 'root',
})
export class GetSettingsService {
  http = inject(HttpClient)
  apiBaseUrl = environment.apiBaseUrl

  getSettings(settingsName: SettingsName): Observable<Settings> {
    return this.http.get<Settings>(`${this.apiBaseUrl}/${settingsName}`)
  }
}
