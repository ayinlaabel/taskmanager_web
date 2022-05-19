import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WebRequestService {
  readonly ROOT_URL = environment.api;
  constructor(private http: HttpClient) {}

  get(uri: string) {
    let token = localStorage.getItem("x-access-token");
    let headers = new HttpHeaders().set("x-access-token", `${token}`);
    return this.http.get(`${this.ROOT_URL}/${uri}`, { headers });
  }

  post(uri: string, payload: Object) {
    let token = localStorage.getItem("x-access-token");
    let headers = new HttpHeaders().set("x-access-token", `${token}`);
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload, { headers });
  }

  patch(uri: string, payload: Object) {
    let token = localStorage.getItem("x-access-token");
    let headers = new HttpHeaders().set("x-access-token", `${token}`);
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload, { headers });
  }

  delete(uri: String) {
    let token = localStorage.getItem("x-access-token");
    let headers = new HttpHeaders().set("x-access-token", `${token}`);
    return this.http.delete(`${this.ROOT_URL}/${uri}`, { headers });
  }
}
