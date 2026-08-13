import { CanMatchFn, Route, UrlSegment } from '@angular/router';

export const NotAuthenticatedGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('NotAuthenticatedGuard')
  return true;
};
