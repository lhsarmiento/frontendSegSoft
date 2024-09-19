import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
/* import { AuthService } from '../../services/auth.service'; */
import { SharedModule } from '../shared/shared.module';
import MenuComponent  from '../../components/menu/menu.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    SharedModule,
    MenuComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  showFiller = false;
  router = inject(Router);
  rebote = false;
  counter = 0;
  constructor(/* public auth:AuthService */){

  }


  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
