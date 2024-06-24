import { Node, Identifier } from "ts-morph";
import Context from "../context";

export default function writeIdentifier(_node: Node, context: Context): string {
  let node = _node as Identifier;

  let apexCode: string = "";

  apexCode += "Identifier: " + node.getFullText().trim();

  return apexCode;
}
