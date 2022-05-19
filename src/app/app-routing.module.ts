import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";
import { EditListComponent } from "./pages/edit-list/edit-list.component";
import { NewListComponent } from "./pages/new-list/new-list.component";
import { TaskViewComponent } from "./pages/task-view/task-view.component";
import { LoginComponent } from "./pages/user/login/login.component";
import { RegisterComponent } from "./pages/user/register/register.component";
import { AuthGuardService as AuthGaurd } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },

  { path: "new-list", component: NewListComponent },
  { path: "lists", component: TaskViewComponent },
  { path: "lists/:listId", component: TaskViewComponent },
  { path: "lists/:listId/new-task", component: NewListComponent },
  { path: "lists/:listId/edit-list", component: EditListComponent },
  { path: "lists/:listId/edit-task/:taskId", component: EditListComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
