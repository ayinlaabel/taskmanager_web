import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-edit-list",
  templateUrl: "./edit-list.component.html",
  styleUrls: ["./edit-list.component.scss"],
})
export class EditListComponent implements OnInit {
  title: string;
  listId: string;
  taskId: string;
  task: string;
  list: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.listId && params.taskId) {
        this.title = "Edit task";
        this.listId = params.listId;
        this.taskId = params.taskId;
        this.taskService
          .getTaskById(params.listId, params.taskId)
          .subscribe((task) => {
            this.task = task["title"];
          });
      } else {
        this.listId = params.listId;
        this.taskService.getListById(params.listId).subscribe((list) => {
          this.list = list["title"];
        });
        this.title = "Edit list";
      }
    });

    console.log(this.listId);
    console.log(this.taskId);
  }

  editTask(title: string) {
    this.taskService
      .editTask(this.listId, this.taskId, title)
      .subscribe((task) => {
        console.log(task);
        this.router.navigate(["/lists/" + this.listId]);
        this.toast.info("Your chnages has been made.");
      });
  }

  editList(title: string) {
    this.taskService.editList(this.listId, title).subscribe((list) => {
      this.router.navigate(["/lists/" + this.listId]);
      this.toast.info("Your chnages has been made.");
    });
  }
}
