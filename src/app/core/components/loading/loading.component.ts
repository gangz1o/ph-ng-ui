import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { LoadingService } from '../../services/loading.service'

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loadingService.loading$ | async) {
      <div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
        <div class="loading-spinner">
          @for (i of [0, 1, 2, 3, 4, 5, 6, 7]; track i) {
            <div class="loading-dot"></div>
          }
        </div>
      </div>
    }
  `,
  styles: [
    `
      .loading-spinner {
        position: relative;
        width: 80px;
        height: 80px;
      }

      .loading-dot {
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: #10b981;
        border-radius: 50%;
        animation: loading 1.2s linear infinite;
      }

      .loading-dot:nth-child(1) {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        animation-delay: 0s;
      }

      .loading-dot:nth-child(2) {
        top: 14.64%;
        right: 14.64%;
        animation-delay: -0.15s;
      }

      .loading-dot:nth-child(3) {
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        animation-delay: -0.3s;
      }

      .loading-dot:nth-child(4) {
        bottom: 14.64%;
        right: 14.64%;
        animation-delay: -0.45s;
      }

      .loading-dot:nth-child(5) {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        animation-delay: -0.6s;
      }

      .loading-dot:nth-child(6) {
        bottom: 14.64%;
        left: 14.64%;
        animation-delay: -0.75s;
      }

      .loading-dot:nth-child(7) {
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        animation-delay: -0.9s;
      }

      .loading-dot:nth-child(8) {
        top: 14.64%;
        left: 14.64%;
        animation-delay: -1.05s;
      }

      @keyframes loading {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.3;
        }
      }
    `,
  ],
})
export class LoadingComponent {
  loadingService = inject(LoadingService)
}
