import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationGuard } from './_guards/authorization.guard';
import { LoggedInGuard } from './_guards/loggedin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FinishRegistrationComponent } from './finish-registration/finish-registration.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
    { path: 'registration', component: RegistrationComponent, canActivate: [LoggedInGuard] },
    { path: 'register/finish/:token', component: FinishRegistrationComponent, canActivate: [LoggedInGuard] },
    { path: '', component: DashboardComponent, canActivate: [AuthorizationGuard] },
    { path: ':shopping_list_id', component: DashboardComponent, canActivate: [AuthorizationGuard] },
    { path: 'details/:id', component: ItemDetailsComponent, canActivate: [AuthorizationGuard] },

    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
