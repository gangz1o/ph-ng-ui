import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private readonly apiKey = environment.tmdbApiKey
  private readonly baseUrl = 'https://api.themoviedb.org/3'

  constructor(private http: HttpClient) {}

  private getCacheKey() {
    return 'tmdb_trending_cache'
  }

  private getCacheTimestampKey() {
    return 'tmdb_trending_cache_timestamp'
  }

  private isCacheValid(): boolean {
    const timestamp = localStorage.getItem(this.getCacheTimestampKey())
    if (!timestamp) return false
    const cacheTime = parseInt(timestamp)
    const currentTime = new Date().getTime()
    return currentTime - cacheTime < 24 * 60 * 60 * 1000 // 24 hours
  }

  getDailyTrending() {
    const cacheKey = this.getCacheKey()

    // Return cached data if valid
    if (this.isCacheValid()) {
      const cachedData = localStorage.getItem(cacheKey)
      if (cachedData) {
        return Promise.resolve(JSON.parse(cachedData))
      }
    }

    // Fetch new data and update cache
    return this.http
      .get(`${this.baseUrl}/trending/all/day`, {
        params: {
          api_key: this.apiKey,
          language: 'en-US',
        },
      })
      .toPromise()
      .then((data) => {
        localStorage.setItem(cacheKey, JSON.stringify(data))
        localStorage.setItem(
          this.getCacheTimestampKey(),
          new Date().getTime().toString(),
        )
        return data
      })
  }
}
