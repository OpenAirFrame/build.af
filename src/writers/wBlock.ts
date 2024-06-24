import { Node, Block } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";

export default function writeBlock(_node: Node, context: Context): string {
  let node = _node as Block;

  let apexCode: string = "";

  apexCode += " {\n";
  node.forEachChild((child) => {
    apexCode += "  " + printNode(child, context).trim().split("\n").join("\n  ") + "\n";
  });
  apexCode += "}";

  return apexCode;
}
