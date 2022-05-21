import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SwPush } from "@angular/service-worker";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { TaskService } from "src/app/services/task.service";
import workerSer from "src/assets/worker.js";

import { v1 as uuid } from "uuid";

@Component({
  selector: "app-task-view",
  templateUrl: "./task-view.component.html",
  styleUrls: ["./task-view.component.scss"],
})
export class TaskViewComponent implements OnInit {
  lists: any;
  tasks: any;

  listId: string;
  show: boolean;

  isComplete: boolean;

  private readonly publicKey =
    "BJ7LRDAPf5UTP5x_HfdZlYYdSh1NbpTxIwBjPSe5k_11Zz9KVfkU6-5nG_AZm0I2BRqnHnAfqckJnitw2QUtmiw";

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private auth: AuthService,
    private swPush: SwPush
  ) // private worker: workerSer
  {}

  ngOnInit() {
    // this.worker.pushNotification();

    // let isLoggedIn = localStorage.getItem('isLoggedIn')
    // console.log(isLoggedIn);
    // if(isLoggedIn !== null){

    // }else{
    //   this.router.navigate(['/login'])
    //   this.toast.error('You are required to login')
    // }

    this.push;
    this.sub;

    this.route.params.subscribe((params) => {
      if (params.listId) {
        this.taskService.getTask(params.listId).subscribe((tasks) => {
          this.tasks = tasks;
          this.listId = params.listId;
        });
      }
    });

    this.taskService.getList().subscribe((lists) => {
      this.lists = lists;
      console.log(lists);
    });
  }

  async push() {
    let t = await navigator.serviceWorker.register("/assets/worker.js");
    console.log(t);
  }

  async sub() {
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BJ7LRDAPf5UTP5x_HfdZlYYdSh1NbpTxIwBjPSe5k_11Zz9KVfkU6-5nG_AZm0I2BRqnHnAfqckJnitw2QUtmiw",
    });

    console.log(JSON.stringify(push));
  }

  newTask() {
    this.router.navigate(["lists/" + this.listId + "/new-task"]);
  }

  editList() {
    this.router.navigate(["/lists/" + this.listId + "/edit-list"]);
  }

  completeTask(id: string, isComplete: any) {
    this.taskService
      .completeTask(this.listId, id, !isComplete)
      .subscribe((task) => {
        this.ngOnInit();
        if (task["isComplete"] == true) {
          this.toast.warning("The task has been set to uncompleted.");
        } else {
          this.toast.success("You have successfully complete this task.");
        }
      });
  }

  editTask(id: string) {
    this.router.navigate(["lists/" + this.listId + "/edit-task/" + id]);
    console.log(id);
    this.toast.warning("Your chnages may not be reversable once it's made!");
  }

  removeTask(id: string) {
    this.taskService.removeTask(this.listId, id).subscribe((task) => {
      console.log(task);
      this.ngOnInit();
      this.toast.success("You have successfully remove the task.");
    });
  }

  removeList() {
    /**
     * @listId - this id is coming from the params
     */
    this.taskService.removeList(this.listId).subscribe((list) => {
      console.log(list);
      this.ngOnInit();
      this.router.navigate(["/lists"]);
      document.querySelector(".drop__down").classList.remove("show");
      document.querySelector(".drop__down-item").classList.remove("show");
      document.querySelector(".drop__down-overlay").classList.remove("show");
      this.show = false;
      this.toast.success("You have successfully remove the list.");
    });
  }

  showDropDown() {
    if (!this.show) {
      document.querySelector(".drop__down").classList.add("show");
      document.querySelector(".drop__down-item").classList.add("show");
      document.querySelector(".drop__down-overlay").classList.add("show");
      this.show = true;
    } else {
      document.querySelector(".drop__down").classList.remove("show");
      document.querySelector(".drop__down-item").classList.remove("show");
      document.querySelector(".drop__down-overlay").classList.remove("show");
      this.show = false;
    }
  }

  close() {
    document.querySelector(".drop__down").classList.remove("show");
    document.querySelector(".drop__down-item").classList.remove("show");
    document.querySelector(".drop__down-overlay").classList.remove("show");
    this.show = false;
  }

  logout() {
    this.auth.logout();
  }

  pushNotification() {
    console.log("Registering service worker...");

    const register = navigator.serviceWorker.register("assets/ngsw-worker.js");
    console.log(register);
  }
}
