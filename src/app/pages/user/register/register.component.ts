import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TaskService } from "src/app/services/task.service";

import { v1 as uuid } from 'uuid';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  // model = {
  //   email: "",
  //   password: "",
  // };

  model = {
    _id: "",
    email: "",
    password: "",
  };
  constructor(
    private taskService: TaskService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  register() {
    /**
     * @desc - THE CODE BELOW IS FOR PRODUCTION ONLY
     */
    // this.taskService.userRegister(this.model).subscribe(
    //   user => {
    //     this.router.navigate(['/login']);
    //     this.toast.success(`${this.model.email} has be registered successfully.`)
    //   }
    // )

    /**
     * @desc - THE CODE BELOW IS FOR LIVE DEMO ONLY
     */

    this.model._id = uuid();

    let findUser = localStorage.getItem("users");
    let users = JSON.parse(findUser);
    console.log(users);
    if (users !== null) {
      let foundUser = users.find((u) => u.email == this.model.email);
      if (foundUser !== undefined) {
        this.toast.error("User Already exist!");
        this.model.email = "";
        this.model.password = "";
      } else {
        let newUser = users;
        newUser.push(this.model);
        localStorage.setItem("users", JSON.stringify(newUser));
        this.router.navigate(["/login"]);
      }
    } else {
      let newUser = [];
      newUser.push(this.model);
      localStorage.setItem("users", JSON.stringify(newUser));
      this.router.navigate(["/login"]);
    }
  }
}
