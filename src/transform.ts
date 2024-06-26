import { Node, SourceFile } from "ts-morph";
import Context from "./context";
import transformPropertyDeclaration from "./transformers/tPropertyDeclaration";

export function transformAST(sourceFile: SourceFile, context: Context): void {
  let apexCode = "";

  const scanNode = (_node: Node, depth = 0) => {
    _node.forEachChild((node) => {
      console.log("  ".repeat(depth) + node.getKindName());

      switch (node.getKindName()) {
        case "PropertyDeclaration":
          transformPropertyDeclaration(node, context);
          break;
        default:
          scanNode(node, depth + 1);
      }
    });
  };

  scanNode(sourceFile);
  //   sourceFile.forEachChild((node) => {
  //     apexCode += printNode(node, context) + "\n";
  //   });

  //   apexCode = apexCode.trim();

  //   let codeHeader = "";
  //   if (context.apiVersion > 0) {
  //     // Add trailing zero if necessary
  //     const apiVersion = new Intl.NumberFormat("en-US", { minimumFractionDigits: 1 }).format(56);
  //     codeHeader += `// API version ${apiVersion}\n`;
  //   }

  //   if (codeHeader !== "") {
  //     apexCode = codeHeader.trim() + "\n\n" + apexCode;
  //   }
}

// function transformAST(sourceFile)
// //let isArrowFunction = false;

// if (property.getInitializer()?.getKindName() === "ArrowFunction") {
//   isArrowFunction = true;
//   return "NO";
// }
