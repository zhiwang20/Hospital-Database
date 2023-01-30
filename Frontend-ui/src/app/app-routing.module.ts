import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MaterialModule } from './material.module';
import { ProfileComponent } from './profile/profile.component';
import { SideNavDrawerComponent } from './side-nav-drawer/side-nav-drawer.component';
import { AwesomeBarComponent } from './awesome-bar/awesome-bar.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SharedTableComponent } from './shared-table/shared-table.component';
import { ListPageComponent } from './list-page/list-page.component';
import { ApiService } from './api/api.service';
import { UpdateComponent } from './dialog/update/update.component';
import { CreateComponent } from './dialog/create/create.component';
import { RemoveComponent } from './dialog/remove/remove.component';
import { DynamicFormUnitComponent } from './dynamic-form-unit/dynamic-form-unit.component';


const secureRoutes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full'},
  { path: 'profile', component: ProfileComponent },
  { path: 'doctors', component: ListPageComponent },
  { path: 'nurses', component: ListPageComponent },
  { path: 'departments', component: ListPageComponent },
  { path: 'wards', component: ListPageComponent },
  { path: 'beds', component: ListPageComponent },
  { path: 'patients', component: ListPageComponent },
  { path: 'operations', component: ListPageComponent },
  { path: 'users', component: ListPageComponent },
];

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'logout', component: LogoutComponent},
  // { path: 'reset-password', component: ResetPasswordComponent},
  // { path: 'reset-password/:token', component: ResetPasswordComponent},
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: secureRoutes
  }
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    MaterialModule,
    RouterModule,
    SideNavDrawerComponent,
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    SideNavDrawerComponent,
    SharedTableComponent,
    ListPageComponent,
    UpdateComponent,
    CreateComponent,
    RemoveComponent,
    DynamicFormUnitComponent,
  ],
  providers: [
    ApiService,
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    CreateComponent,
    UpdateComponent,
    RemoveComponent,
  ]
})
export class AppRoutingModule { }
