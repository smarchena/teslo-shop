import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, map, Observable, tap, of } from 'rxjs';

import { User } from '@auth/interfaces/user.interface';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { rxResource } from '@angular/core/rxjs-interop';


type AuthStatus = 'checking' | 'authenticated' | 'not-aunthenticated'
const baseUrl = environment.baseUrl

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking')
  private _user = signal<User | null>(null)
  private _token = signal<string | null>(localStorage.getItem('token'))

  private http = inject(HttpClient)

  checkStatusResource = rxResource({
    params: () => ({}),
    stream: () => this.checkStatus()
  })

  authStatus = computed(() => {
    if (this._authStatus() === 'checking') return 'checking'

    if (this._user()) {
      return 'authenticated'
    }
    return 'not-aunthenticated'
  })

  user = computed(() => this._user())
  token = computed(this._token)

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email: email,
      password: password
    }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if (!token) {
      this.logOut()
      return of(false)
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }

  logOut() {
    this._user.set(null)
    this._token.set(null)
    this._authStatus.set('not-aunthenticated')


    localStorage.removeItem('token')
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user)
    this._authStatus.set('authenticated')
    this._token.set(token)

    localStorage.setItem('token', token)
    return true
  }

  private handleAuthError(error: any) {
    this.logOut()
    return of(false)
  }

   register(fullName: string, email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/register`, {
      fullName: fullName,
      email: email,
      password: password
    }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }

}
