import { Component } from "@angular/core";
import { SwPush } from "@angular/service-worker";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "taskmanager";

  constructor(private swPush: SwPush) {}
  ngOnInit() {
    this.pushNotification();
  }

  async pushNotification() {
    console.log("Registering service worker...");

    const sub = await this.swPush.requestSubscription({
      serverPublicKey:
        "BJ7LRDAPf5UTP5x_HfdZlYYdSh1NbpTxIwBjPSe5k_11Zz9KVfkU6-5nG_AZm0I2BRqnHnAfqckJnitw2QUtmiw",
    });
  }
}
