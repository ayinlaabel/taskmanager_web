import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WebRequestService } from "./web-request.service";
import { environment } from "src/environments/environment";
import { SwPush } from "@angular/service-worker";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  readonly publicKey =
    "BJ7LRDAPf5UTP5x_HfdZlYYdSh1NbpTxIwBjPSe5k_11Zz9KVfkU6-5nG_AZm0I2BRqnHnAfqckJnitw2QUtmiw";
  url = environment.api;

  constructor(private webRequest: WebRequestService) {}

  userRegister(user: Object) {
    return this.webRequest.post("users", user);
  }

  userLogin(user: Object) {
    return this.webRequest.post("users/login", user);
  }

  createList(title: string) {
    return this.webRequest.post("lists", { title });
  }

  createTask(listId: string, title: string) {
    return this.webRequest.post(`lists/${listId}/tasks`, { title });
  }

  getList() {
    return this.webRequest.get("lists");
  }

  getTask(listId: string) {
    return this.webRequest.get(`lists/${listId}/tasks`);
  }

  getTaskById(listId: string, taskId: string) {
    return this.webRequest.get(`lists/${listId}/tasks/${taskId}`);
  }

  editTask(listId: string, id: string, title: string) {
    return this.webRequest.patch(`lists/${listId}/tasks/${id}`, { title });
  }

  completeTask(listId: string, id: string, isComplete: boolean) {
    return this.webRequest.patch(`lists/${listId}/tasks/${id}`, { isComplete });
  }

  removeList(listId: string) {
    return this.webRequest.delete(`lists/${listId}`);
  }

  removeTask(listId: string, id: string) {
    return this.webRequest.delete(`lists/${listId}/tasks/${id}`);
  }

  logout() {
    return this.webRequest;
  }
}
