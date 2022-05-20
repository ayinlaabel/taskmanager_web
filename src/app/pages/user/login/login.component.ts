import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  model = {
    email: "",
    password: "",
  };
  constructor(
    private taskService: TaskService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit() {}

  async login() {
    /**
     * @desc - THE CODE BELOW IS FOR PRODUCTION ONLY
     */
    this.taskService.userLogin(this.model).subscribe(
      user => {
        if(user['message']){
          this.toast.error(user['message'])
          this.model.password = ''
        }

        if(user['token']){
          localStorage.setItem('x-access-token', user['token'])
          this.router.navigate(['/lists'])
          console.log(user)
        }

      }
    )

    /**
     * @desc - THE CODE BELOW IS FOR LIVE DEMO
     */
    // let getUsers = JSON.parse(localStorage.getItem("users"));
    // let findUser;
    
    // if (getUsers === undefined || getUsers === null){
    //   this.toast.error('No user found!')
    //   findUser = getUsers.find((u) => u.email === this.model.email);
    // }

    // if (findUser !== undefined) {
    //   if (findUser.password === this.model.password) {
    //     this.router.navigate(["/lists"]);
    //     localStorage.setItem('isLoggedIn', findUser._id)
    //   } else {
    //     this.toast.error("Wrong password, try again!");
    //     this.model.password = "";
    //   }
    // } else {
    //   this.toast.error("No user found!");
    //   this.model.email = "";
    //   this.model.password = "";
    // }
  }
}
