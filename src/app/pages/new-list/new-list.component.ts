import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-new-list",
  templateUrl: "./new-list.component.html",
  styleUrls: ["./new-list.component.scss"],
})
export class NewListComponent implements OnInit {
  title: string;
  listId: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.listId) {
        this.title = "Create a new task";
        this.listId = params.listId;
      } else {
        this.title = "Create a new list";
      }
    });
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe((res) => {
      this.router.navigate(["lists/" + res["_id"] + "/new-task"]);
      this.toast.success("Your List has been created successfully, You can now create a task.")
    });
  }
  
  createTask(title: string) {
    this.taskService.createTask(this.listId, title).subscribe((res) => {
      this.router.navigate(["lists/" + this.listId]);
      this.toast.success("Your Task has been created successfully.");
    });
  }
}
