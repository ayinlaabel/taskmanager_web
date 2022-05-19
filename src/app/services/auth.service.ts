import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private router: Router
  ) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("x-access-token");

    return !token;
  }

  getAccessToken() {
    return localStorage.getItem("x-access-token");
  }

  logout() {
    this.removeAccess();
    this.router.navigate(['/login'])

  }

  private removeAccess(){
    localStorage.removeItem('x-access-token');
  }
}
