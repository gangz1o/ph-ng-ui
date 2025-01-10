import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslocoModule, TranslocoService } from '@ngneat/transloco'
import { CarouselModule } from 'primeng/carousel'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { TmdbService } from '../../core/services/tmdb.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    TranslocoModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  interval = 4000
  translocoService = inject(TranslocoService)
  trendingItems: any[] = []
  isLoading = true
  responsiveOptions: any[] = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ]

  constructor(private tmdbService: TmdbService) {}

  public openTmdbDetail(item: any) {
    const baseUrl = 'https://www.themoviedb.org'
    const url =
      item.media_type === 'movie'
        ? `${baseUrl}/movie/${item.id}`
        : `${baseUrl}/tv/${item.id}`
    window.open(url, '_blank')
  }

  ngOnInit() {
    this.isLoading = true
    this.tmdbService
      .getDailyTrending()
      .then((data: any) => {
        this.isLoading = false
        this.trendingItems = data.results.map((item: any) => ({
          title: item.title || item.name,
          poster: item.poster_path
            ? `https://image.tmdb.org/t/p/original${item.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Image',
          overview: item.overview,
          rating: item.vote_average.toFixed(1),
          id: item.id,
          media_type: item.media_type,
        }))
      })
      .catch((err) => {
        console.error('Error fetching trending data:', err)
      })
  }
}
