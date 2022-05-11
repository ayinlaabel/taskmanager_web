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
        console.log(params);
        this.taskService
          .getTaskById(params.listId, params.taskId)
          .subscribe((task) => {
            this.task = task["title"];
          });
      } else {
        this.title = "Edit list";
      }
    });
  }

  editTask(title: string){
    this.taskService.editTask(this.listId, this.taskId, title).subscribe(
      task => {
        console.log(task)
        this.router.navigate(['..'])
        this.toast.info("Your chnages has been made.");
      }
    )
  }
}
