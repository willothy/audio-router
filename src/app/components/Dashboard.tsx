import * as React from "react";
import { ipcRenderer } from "electron";

interface IState {
  message: string;
}

export class Dashboard extends React.Component<{}, IState> {
  public state: IState = {
    message: ""
  };

  public componentDidMount(): void {
    ipcRenderer.on("confirm", this.onMessage);
  }

  public componentWillUnmount(): void {
    ipcRenderer.removeAllListeners("confirm");
  }

  public render(): React.ReactNode {
    return <div>{this.state.message}</div>;
  }

  private onMessage = (event: any, message: string) => {
    this.setState({ message: message });
  };
}