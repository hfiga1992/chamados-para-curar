import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  template: `
    <div class="flex flex-col min-h-screen">
      <!-- O header removido para evitar duplicação -->

      <main class="flex-grow">
        <div class="container mx-auto px-4 py-8">
          <ng-content></ng-content>
        </div>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styles: []
})
export class LayoutComponent {}
