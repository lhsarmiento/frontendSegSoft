import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export default class MenuComponent {
  static switch: any = 0;
  constructor(public auth: AuthService) {

  }
}
