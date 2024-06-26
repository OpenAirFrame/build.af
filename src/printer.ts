import { SourceFile, Node, StringLiteral, NumericLiteral } from "ts-morph";

import writeBinaryExpression from "./writers/wBinaryExpression";
import writeBlock from "./writers/wBlock";
import writeCallExpression from "./writers/wCallExpression";
import writeClassDeclaration from "./writers/wClassDeclaration";
import writeMethodDeclaration from "./writers/wMethodDeclaration";
import writeFunctionDeclaration from "./writers/wFunctionDeclaration";

import writeExpressionStatement from "./writers/wExpressionStatement";
import writeReturnStatement from "./writers/wReturnStatement";

import writeIdentifier from "./writers/wIdentifier";
import writeNewExpression from "./writers/wNewExpression";
import writeParenthesizedExpression from "./writers/wParenthesizedExpression";

import writePropertyAccessExpression from "./writers/wPropertyAccessExpression";
import writeVariableStatement from "./writers/wVariableStatement";
import writePrefixUnaryExpression from "./writers/wPrefixUnaryExpression";
import writePostfixUnaryExpression from "./writers/wPostfixUnaryExpression";
import writeArrowFunction from "./writers/wArrowFunction";

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
    case "SuperKeyword":
      writerOutput.push("super");
      break;
    case "ThisKeyword":
      writerOutput.push("this");
      break;

    case "DotToken":
      writerOutput.push(".");
      break;

    case "ArrowFunction":
      writerOutput.push(writeArrowFunction(node, context));
      break;

    case "ClassDeclaration":
      writerOutput.push(writeClassDeclaration(node, context));
      break;
    case "MethodDeclaration":
      writerOutput.push(writeMethodDeclaration(node, context));
      break;
    case "FunctionDeclaration":
      writerOutput.push(writeFunctionDeclaration(node, context));
      break;

    case "ExpressionStatement":
      writerOutput.push(writeExpressionStatement(node, context));
      break;
    case "VariableStatement":
      writerOutput.push(writeVariableStatement(node, context));
      break;
    case "ReturnStatement":
      writerOutput.push(writeReturnStatement(node, context));
      break;

    case "BinaryExpression":
      writerOutput.push(writeBinaryExpression(node, context));
      break;
    case "CallExpression":
      writerOutput.push(writeCallExpression(node, context));
      break;
    case "ParenthesizedExpression":
      writerOutput.push(writeParenthesizedExpression(node, context));
      break;
    case "NewExpression":
      writerOutput.push(writeNewExpression(node, context));
      break;

    case "PropertyAccessExpression":
      writerOutput.push(writePropertyAccessExpression(node, context));
      break;

    case "PrefixUnaryExpression":
      writerOutput.push(writePrefixUnaryExpression(node, context));
      break;

    case "PostfixUnaryExpression":
      writerOutput.push(writePostfixUnaryExpression(node, context));
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

export function printApex(sourceFile: SourceFile, context: Context) {
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
