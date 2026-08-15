import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
