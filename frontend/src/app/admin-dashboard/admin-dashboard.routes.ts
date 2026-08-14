import { Routes } from "@angular/router";
import { AdminDashboardLayout } from "./layouts/admin-dashboard-layout/admin-dashboard-layout";
import { ProductAdminPage } from "./pages/product-admin-page/product-admin-page";

export const adminDashboardRoutes: Routes = [

  {
    path: '',
    component: AdminDashboardLayout,
    children: [
      {
        path: 'products',
        component: ProductAdminPage
      },
      {
        path: 'product/:id ',
        component: ProductAdminPage
      },
      {
        path: '**',
        redirectTo: 'products'
      },

    ]
  },
]

export default adminDashboardRoutes
