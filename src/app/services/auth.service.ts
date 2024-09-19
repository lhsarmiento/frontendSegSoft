import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { BasicResponse } from '../models/basic-response.model';
import { RequestService } from '../../app/services/request.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  router = inject(Router);
  constructor(private requestsService: RequestService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      if (sessionStorage.getItem('dataUser') != null) {
        this.user = JSON.parse(sessionStorage.getItem('dataUser')!);
      }
    }
  }
  async login(params: any): Promise<BasicResponse> {
    const result = await this.requestsService.postLikeJSON(`${environment.apiUrl}/auth/login`, params);
    return result;
  }
  async register(params: any): Promise<BasicResponse> {
    const result = await this.requestsService.postLikeJSON(`${environment.apiUrl}/auth/register`, params);
    return result;
  }
  async logout() {
    sessionStorage.clear()
    this.user = undefined;
    this.router.navigate(['/login']);
  }
}
