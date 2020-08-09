import { useDebugValue } from "react";
import "@babel/polyfill";
import { ProvidePlugin } from "webpack";

const { ConnectionBuilder } = require("electron-cgi");

export class AudioController {
    connection: any;
    onDisconnectedFromDotNet: Function;
    tempProp: any;

    constructor(onDisonnected: Function = null) {
        this.connection = new ConnectionBuilder()
            .connectTo("dotnet", "run", "--project", "./core/Core")
            .build();

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
    }

    getMasterVolume(callback: Function) {
        this.connection.send("master_volume_get", (err:any, res: any) => {        
            callback(res, err);
        });
    }

    setMasterVolume(value: number, callback: Function) {
        this.connection.send("master_volume_set", value, (err:any, res: any) => {        
            callback(res, err);
        });
    }

    // Set negative step to decrement, positive to increment
    stepMasterVolume(stepAmount: number, callback: Function) {
        this.connection.send("master_volume_step", stepAmount, (err:any, res: any) => {        
            callback(res, err);
        });
    }

    getMasterVolumeMute(callback: Function) {
        this.connection.send("master_volume_mute_get", (err:any, res: any) => {        
            callback(res, err);
        });
    }

    setMasterVolumeMute(muted: Boolean, callback: Function) {
        this.connection.send("master_volume_mute_set", muted, (err:any, res: any) => {        
            callback(res, err);
        });
    }

    toggleMasterVolumeMute(callback: Function) {
        this.connection.send("master_volume_mute_toggle", (err:any, res: any) => {        
            callback(res, err);
        });
    }

    getPidDisplayName(pid: number, callback: Function) {
        this.connection.send("get_pid_display_name", pid, (err:any, res: any) => {        
            callback(res, err);
        });
    }

    getPossibleDevices(callback: Function) {
        this.connection.send("get_devices", (err:any, res: any) => {        
            callback(res, err);
        });
    }
    
}