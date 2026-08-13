import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { tap } from 'rxjs';

import { User } from '@auth/interfaces/user.interface';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-aunthenticated'
const baseUrl = environment.baseUrl

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking')
  private _user = signal<User | null>(null)
  private _token = signal<string | null>(null)

  private http = inject(HttpClient)

  authStatus = computed(() => {
    if (this._authStatus() === 'checking') return 'checking'

    if (this._user()) {
      return 'authenticated'
    }
    return 'not-aunthenticated'
  })

  user = computed(() => this._user())
  token = computed(this._token)

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email: email,
      password: password
    }).pipe(
      tap(resp => {
        this._user.set(resp.user)
        this._authStatus.set('authenticated')
        this._token.set(resp.token)

        localStorage.setItem('token', resp.token)
      })
    )
  }

}
