import { SourceFile, Node, StringLiteral, NumericLiteral } from "ts-morph";

import writeClassDeclaration from "./writers/wClassDeclaration";
import writeExpressionStatement from "./writers/wExpressionStatement";
import writeVariableStatement from "./writers/wVariableStatement";
import writeBinaryExpression from "./writers/wBinaryExpression";
import writeCallExpression from "./writers/wCallExpression";
import writePropertyAccessExpression from "./writers/wPropertyAccessExpression";
import writeBlock from "./writers/wBlock";
import writeIdentifier from "./writers/wIdentifier";

import Context from "./context";

export function printNode(node: Node, context: Context): string {
  // convert node to Apex code and return it

  const writerOutput: Array<String> = [];

  switch (node.getKindName()) {
    case "StringLiteral":
      writerOutput.push("'" + (node as StringLiteral).getLiteralValue() + "'");
      break;
    case "NumericLiteral":
      writerOutput.push((node as NumericLiteral).getLiteralValue().toString());
      break;

    case "Block":
      writerOutput.push(writeBlock(node, context));
      break;
    case "Identifier":
      writerOutput.push(writeIdentifier(node, context));
      break;

    case "ClassDeclaration":
      writerOutput.push(writeClassDeclaration(node, context));
      break;
    case "ExpressionStatement":
      writerOutput.push(writeExpressionStatement(node, context));
      break;
    case "VariableStatement":
      writerOutput.push(writeVariableStatement(node, context));
      break;

    case "BinaryExpression":
      writerOutput.push(writeBinaryExpression(node, context));
      break;
    case "CallExpression":
      writerOutput.push(writeCallExpression(node, context));
      break;
    case "PropertyAccessExpression":
      writerOutput.push(writePropertyAccessExpression(node, context));
      break;

    case "EndOfFileToken":
      // writerOutput.push("EOF");
      break;
    default:
      writerOutput.push("*** DEFAULT: " + node.getKindName() + " / " + node.getText());
  }
  // if (ts.isClassDeclaration(node)) {
  // writerOutput.push(writeClassDeclaration(node));
  // } else if (ts.isIdentifier(node)) {
  // writerOutput.push("*" + node.text);
  // } else {
  // writerOutput.push(ts.SyntaxKind[node.kind] + ": " + node.getFullText());
  // }

  return writerOutput.join("\n");
}

export function printApex(sourceFile: SourceFile) {
  const context: Context = new Context();
  // const x = sourceFile.getClassOrThrow("PublicPerson");
  // const props = x.getInstanceProperties();

  // props.forEach((prop) => {
  //   console.log(prop.getDecorator("isTest"));
  // });
  // return "";
  // convert sourceFile to Apex code and return it
  let apexCode = "";

  sourceFile.forEachChild((node) => {
    apexCode += printNode(node, context) + "\n";
  });

  apexCode = apexCode.trim();

  let codeHeader = "";
  if (context.apiVersion > 0) {
    // Add trailing zero if necessary
    const apiVersion = new Intl.NumberFormat("en-US", { minimumFractionDigits: 1 }).format(56);
    codeHeader += `// API version ${apiVersion}\n`;
  }

  if (codeHeader !== "") {
    apexCode = codeHeader.trim() + "\n\n" + apexCode;
  }

  return apexCode.trim();
}
