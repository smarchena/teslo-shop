import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-aunthenticated'

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

}
