import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthapiService } from '../Services/authapi.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthapiService);
  const router = inject(Router);

  const expectedRoles: string[] = route.data['roles'];
  const userRole = authService.getUserRole();

  if (!userRole || !expectedRoles.includes(userRole)) {
    router.navigate(['/unauthorized']); // redirect if role doesn't match
    return false;
  }
  return true;
};
