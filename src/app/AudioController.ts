const { ConnectionBuilder } = require("electron-cgi");

export class AudioController {
    connectionBuilder: any;

    constructor(connBuilder: any = null) {
        if (connBuilder == null) {
            this.connectionBuilder = new ConnectionBuilder()
                .connectTo("dotnet", "run", "--project", "./core/Core")
                .build();
        } else {
            this.connectionBuilder = connBuilder;
        }

        this.connectionBuilder.onDisconnect = () => {
            console.log("Lost connection");
        }

        
    }
    
}