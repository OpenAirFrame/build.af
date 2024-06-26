import { Node } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";

export default class {
  static methods: { [key: string]: Function } = {};

  static handleCallExpression(
    expressionParts: Array<Node>,
    args: Array<Node>,
    context: Context
  ): string {
    if (Object.keys(this.methods).length > 0) {
      let method: string =
        expressionParts.length === 1 ? "__default" : expressionParts[2].getFullText().trim();

      if (this.methods[method]) {
        return this.methods[method](expressionParts, args, context);
      }
    }

    // Render with default implementation
    let apexCode: string = "";

    expressionParts.forEach((part) => {
      apexCode += printNode(part, context);
    });

    let argsApex: Array<string> = [];
    args.forEach((arg) => {
      argsApex.push(printNode(arg, context));
    });

    apexCode += "(";
    apexCode += argsApex.join(", ");
    apexCode += ")";
    return apexCode;
  }
}
