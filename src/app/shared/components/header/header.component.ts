import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;

  constructor(private router: Router) {
    // Subscrição para eventos de navegação concluída
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Rolar para o topo quando a navegação for concluída
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
    // Verificar a posição inicial do scroll
    this.checkScroll();
  }

  @HostListener('window:scroll')
  checkScroll() {
    // Verificar se o scroll passou de 50px
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
