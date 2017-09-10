import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationGuard } from './_guards/authorization.guard';
import { LoggedInGuard } from './_guards/loggedin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
    { path: '', component: DashboardComponent, canActivate: [AuthorizationGuard] },
    { path: 'details/:id', component: ItemDetailsComponent, canActivate: [AuthorizationGuard] },

    { path: '**', redirectTo: '/' }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
