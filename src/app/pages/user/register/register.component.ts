import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model = {
    email:'',
    password:''
  }
  constructor(private taskService: TaskService,
            private toast: ToastrService,
            private router: Router) { }

  ngOnInit() {
  }

  register(){
    this.taskService.userRegister(this.model).subscribe(
      user => {
        this.router.navigate(['/login']);
        this.toast.success(`${this.model.email} has be registered successfully.`)
      }
    )
    // console.log(this.model)
  }

}
