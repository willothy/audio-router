const url = require("url");
const path = require("path");

const { ConnectionBuilder } = require("electron-cgi");

import { app, BrowserWindow } from "electron";
import { AudioController } from "./app/AudioController";
import "@babel/polyfill";

let window: BrowserWindow | null;

var masterVol = 0;

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

connection.send("master_volume_get", (error: any, response: any) => {
  window.webContents.send("confirm", response); // Send data back to Program.cs
  console.log(response);
  masterVol = response.toInt();
  connection.close();
});*/

var ac = new AudioController();

/*ac.getPidDisplayName(2276, (res: any) => {
  console.log("spotify 1");
  console.log(res);
});

ac.getPidDisplayName(2500, (res: any) => {
  console.log("spotify 2");
  console.log(res);
});

ac.getPidDisplayName(5916, (res: any) => {
  console.log("spotify 3");
  console.log(res);
});

ac.getPidDisplayName(13012, (res: any) => {
  console.log("spotify 4");
  console.log(res);
});

ac.getPidDisplayName(10200, (res: any) => {
  console.log("spotify 5");
  console.log(res);
});*/

ac.getPossibleDevices((err:any, res: any) => {
  console.log(res);
});




