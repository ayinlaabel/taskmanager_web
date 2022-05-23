pushNotification = () => {
  console.log("me");
  self.addEventListener("push", (e) => {
    const data = e.data.json();
    self.registration.showNotification("test message", {
      body: "Notification Testing!",
      icon: "http://image.ibb.co/frY0Fd/tmlogo.png",
    });
  });
};
