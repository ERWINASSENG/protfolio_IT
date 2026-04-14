import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-wrapper">
      <app-header />
      <main class="main-content">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styles: [`
    .app-wrapper {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .main-content {
      flex: 1;
    }
  `]
})
export class AppComponent {
}
