import { Node, NewExpression } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";

export default function writeNewExpression(_node: Node, context: Context): string {
  let node = _node as NewExpression;

  let apexCode: string = "";

  apexCode += "new ";
  apexCode += printNode(node.getExpression(), context);

  let argsApex: Array<string> = [];
  node.getArguments().forEach((arg) => {
    argsApex.push(printNode(arg, context));
  });

  apexCode += "(";
  apexCode += argsApex.join(", ");
  apexCode += ")";
  //   apexCode += "NewExpression Ident: " + +"\n";
  //   apexCode += "NewExpression: " + node.getFullText().trim();

  return apexCode;
}
