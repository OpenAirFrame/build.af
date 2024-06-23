import { Project, ts } from "ts-morph";

export default class Context {
  public apiVersion: number = 0;

  // public checker: Context;

  public setApiVersion(version: number): void {
    this.apiVersion = version;
  }
}
