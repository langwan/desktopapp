const { app, BrowserWindow } = require("electron");

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: "痴货大本营",
  });
  win.loadURL("http://localhost:3002/");
});
