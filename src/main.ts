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

function main() {
  var ac = new AudioController();

  ac.getMasterVolume((res: any) => {
    //console.log(res);
  });
}

main();




