import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TaskViewComponent } from "./pages/task-view/task-view.component";
import { NewListComponent } from "./pages/new-list/new-list.component";
import { EditListComponent } from "./pages/edit-list/edit-list.component";
import { RegisterComponent } from "./pages/user/register/register.component";
import { LoginComponent } from "./pages/user/login/login.component";
import { FormsModule } from "@angular/forms";
import { WebReqInterceptor } from "./interceptor/web-req.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    LoginComponent,
    RegisterComponent,
    EditListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
