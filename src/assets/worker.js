pushNotification = () =>{
  console.log("me")
  self.addEventListener("push", () => {
  self.registration.sendNotification("test message", {});
})};
