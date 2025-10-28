import { Routes } from '@angular/router';
import { Home, Store, Cart, Reserve, Checkout, Login, Register, Profile, Mypersonaldata, ResetSecret, Mypurchases, Myreservations } from './pages';
import { authGuard, checkoutGuard, unauthGuard } from './guards';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'tienda',
        component: Store
    },
    {
        path: 'micarrito',
        component: Cart
    },
    {
        path: 'reserve',
        component: Reserve,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: Login,
        canActivate: [unauthGuard]
    },
    {
        path: 'register',
        component: Register,
        canActivate: [unauthGuard]
    },
    {
        path: 'checkout',
        component: Checkout,
        canActivate: [authGuard, checkoutGuard]
    },
    {
        path: 'mi-perfil',
        component: Profile,
        canActivate: [authGuard],
        children: [
            {
                path: '', 
                redirectTo: 'datos-personales',
                pathMatch: 'full' 
            },
            {
                path: 'datos-personales',
                component: Mypersonaldata
            },
            {
                path: 'cambiar-mi-clave',
                component: ResetSecret
            },
            {
                path: 'mis-compras',
                component: Mypurchases
            },
            {
                path: 'mis-reservaciones',
                component: Myreservations
            }
        ]
    },
];
