import { Project, ts, SourceFile, Node } from "ts-morph";
import writeClassDeclaration from "./writers/wClassDeclaration";
import Context from "./context";

export function printNode(node: Node, context: Context): string {
  // convert node to Apex code and return it

  const writerOutput: Array<String> = [];

  switch (node.getKindName()) {
    case "ClassDeclaration":
      writerOutput.push(writeClassDeclaration(node, context));
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
