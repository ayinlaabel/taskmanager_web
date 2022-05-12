import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TaskViewComponent } from "./pages/task-view/task-view.component";
import { NewListComponent } from "./pages/new-list/new-list.component";
import { EditListComponent } from "./pages/edit-list/edit-list.component";
import { RegisterComponent } from './pages/user/register/register.component';
import { LoginComponent } from './pages/user/login/login.component';
import { FormsModule } from "@angular/forms";

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
    ToastrModule.forRoot(), 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
