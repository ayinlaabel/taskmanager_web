pushNotification = () => {
  console.log("me");
  self.addEventListener("push", (e) => {
    const { sub } = e.data.json();
    const data = sub
    console.log(data);
    self.registration.showNotification(data.title, {
      body: "Notification Testing!",
      icon: "http://image.ibb.co/frY0Fd/tmlogo.png",
    });
  });
};
