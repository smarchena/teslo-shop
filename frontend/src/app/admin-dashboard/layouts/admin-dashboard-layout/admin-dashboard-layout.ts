import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-dashboard-layout.html',
})
export class AdminDashboardLayout {
  authService = inject(AuthService)
  router = inject(Router)

  user = computed(() => this.authService.user())


  onLogout() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

}
