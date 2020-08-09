const url = require("url");
const path = require("path");

const { ConnectionBuilder } = require("electron-cgi");

import { app, BrowserWindow } from "electron";
import { AudioController } from "./app/AudioController";

let window: BrowserWindow | null;

const createWindow = () => {
  window = new BrowserWindow({ width: 800, height: 600 });

  window.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  window.on("closed", () => {
    window = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (window === null) {
    createWindow();
    
  }
});


/*let connection = new ConnectionBuilder()
  .connectTo("dotnet", "run", "--project", "./core/Core")
  .build();

connection.onDisconnect = () => {
  console.log("lost");
};

connection.send("master_volume", "50", (error: any, response: any) => {
  window.webContents.send("confirm", response); // Send data back to Program.cs
  console.log(response);
  connection.close();
});*/

var ac = new AudioController();

console.log(ac.getMasterVolume());


