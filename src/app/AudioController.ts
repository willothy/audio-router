const { ConnectionBuilder } = require("electron-cgi");

export class AudioController {
    connection: any;
    onDisconnectedFromDotNet: Function;

    constructor(connBuilder: any = null, onDisonnected: Function = null) {
        if (connBuilder == null) {
            this.connection = new ConnectionBuilder()
                .connectTo("dotnet", "run", "--project", "./core/Core")
                .build();
        } else {
            this.connection = connBuilder;
        }

        if (onDisonnected == null) {
            this.onDisconnectedFromDotNet = () => {
                console.log("ERROR: AudioController lost connection to .NET");
            }
        } else {
            this.onDisconnectedFromDotNet = onDisonnected;
        }

        this.connection.onDisconnect = () => {
            this.onDisconnectedFromDotNet();
        }
    }

    closeConnection() {
        this.connection.close();
        return 0;
    }

    getMasterVolume() {
        return this.connection.send("master_volume_get", (error: any, response: string) => {
            //window.webContents.send("confirm", response); // Send data back to Program.cs
            //console.log(response);
            //connection.close();
            return response;
        });
    }
    
}