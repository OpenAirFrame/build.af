import { Node, PropertyAccessExpression } from "ts-morph";
import Context from "../context";

export default function writePropertyAccessExpression(_node: Node, context: Context): string {
  let node = _node as PropertyAccessExpression;

  let apexCode: string = "";

  apexCode += "PropertyAccessExpression: " + node.getFullText().trim();

  return apexCode;
}
