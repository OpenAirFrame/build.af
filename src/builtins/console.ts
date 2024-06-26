import BaseCallExpression from "./baseCallExpression";
import { Node } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";

export default class extends BaseCallExpression {
  static override handleCallExpression(
    expressionParts: Array<Node>,
    args: Array<Node>,
    context: Context
  ): string {
    this.methods = {
      log: this.log,
    };

    return super.handleCallExpression(expressionParts, args, context);
  }

  static log(expressionParts: Array<Node>, args: Array<Node>, context: Context): string {
    let apexCode: string = "";
    // expressionParts.forEach((part) => {
    //   apexCode += printNode(part, context);
    // });
    apexCode += "System.debug";

    let argsApex: Array<string> = [];
    args.forEach((arg) => {
      argsApex.push(printNode(arg, context));
    });

    apexCode += "(";
    apexCode += argsApex.join(" + ' ' + ");
    apexCode += ")";

    return apexCode;
  }
}
