import { useDebugValue } from "react";
import "@babel/polyfill";

const { ConnectionBuilder } = require("electron-cgi");

export class AudioController {
    connection: any;
    onDisconnectedFromDotNet: Function;
    tempProp: any;

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

    tempValue(value: any) {
        this.tempProp = value;
        return value;
    }


    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async waitForValue(): Promise<String> {
        if (this.tempProp != undefined) {
            return this.tempProp;
        } else {
            await this.delay(30);
            return await this.waitForValue();
        }
    }

    getMasterVolume_A() {
        this.connection.send("master_volume_get").then((res: any) => {
            this.tempValue(res);
        });
        this.waitForValue().then((res: any) => {
            this.tempValue(res);
        });
        return true;
    }

    getMasterVolume() {
        this.getMasterVolume_A();
        
        return this.tempProp;
    }
    
}