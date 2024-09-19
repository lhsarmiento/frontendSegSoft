import { NgIf } from '@angular/common';
import { Component, Inject, OnInit, ViewChild, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
/* import { CodeOtpComponent } from '../../components/code-otp/code-otp.component'; */
import { NotificationImplService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getErrorMessage, hideSpinner, showSpinner } from '../../services/functions.service';
import { AuthService } from '../../services/auth.service';
import SignupComponent from '../signup/signup.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    NgIf,
    MatInputModule,
    MatButtonModule,
    MatBottomSheetModule,
    SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  public auth = inject(AuthService);
  public notificationService = inject(NotificationImplService);
  hide = false;
  static switch: any = 0;
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(private dialog: MatDialog,) {

  }
  async signIn() {
    const { email, password } = this.loginForm.value;
    const result = await this.auth.login({ nickname: email, password: password });
    console.log('result', result);
    if (result.success) {
      sessionStorage.setItem('dataUser', JSON.stringify(result.data));
      this.auth.user = JSON.parse(sessionStorage.getItem('dataUser')!);
      this.goToDashboard();

    } else {
      this.notificationService.errorNotification(result.error.message);

    }
  }
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
  openSignup(data: any, action: string) {
    const dialogConfig = new MatDialogConfig();
    data.action = action;
    dialogConfig.data = data;
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '57%';
    dialogConfig.height = "fit-content";
    const dialogRef = this.dialog.open(SignupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
    });

  }
  static changeValueDialog(value: any) {
    this.switch = value

  }
}
