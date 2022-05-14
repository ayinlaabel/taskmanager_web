import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = {
    email:'',
    password: ''
  }
  constructor(private taskService: TaskService,
              private router: Router,
              private toast: ToastrService) { }

  ngOnInit() {
  }

  login(){
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
  }
}
