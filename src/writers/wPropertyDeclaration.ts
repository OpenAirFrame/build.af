import { ts } from "ts-morph";
// import { printNode } from "../printer";

export default function writePropertyDeclaration(node: ts.PropertyDeclaration): string {
  let apexCode = "";

  const name = node.name.getText();
  const type = node.type?.getText() || "";

  let mod: "public" | "protected" | "private" = "public";
  let isStatic = false;
  let isReadonly = false;
  for (let i of node.modifiers || []) {
    if (i.kind === ts.SyntaxKind.PrivateKeyword) {
      mod = "private";
    } else if (i.kind === ts.SyntaxKind.ProtectedKeyword) {
      mod = "protected";
    } else if (i.kind === ts.SyntaxKind.StaticKeyword) {
      isStatic = true;
    } else if (i.kind === ts.SyntaxKind.ReadonlyKeyword) {
      isReadonly = true;
    }
  }

  //   if (isStatic && isReadonly) {
  //     descriptor?.addStaticConst(
  //       node.name.getText(),
  //       renderNode(member.initializer, context),
  //       getPhpPrimitiveType(member.initializer!, context.checker, context.log)
  //     );
  //   } else {
  //     descriptor?.addProperty(
  //       renderNode(member.name, context),
  //       getPhpPrimitiveType(member.initializer!, context.checker, context.log),
  //       mod
  //     );
  //   }

  //   context.checker
  //   node.initializer
  apexCode += "--name: " + name + "\n";
  apexCode += "--type: " + type + "\n";

  apexCode += "--isStatic:" + isStatic + "\n";
  apexCode += "--isReadonly:" + isReadonly + "\n";

  //   node.forEachChild((child) => {
  // apexCode += printNode(child) + "\n";
  //   });

  // Check to see what the type is
  //   if (node.type) {
  //     apexCode += "--type: " + node.type.getText() + "\n";
  //   }

  // Get the AST type
  //   apexCode += ts.SyntaxKind[node.kind] + ": " + node.getFullText() + "\n";

  //   if (node.modifiers) {
  // apexCode += node.modifiers.map((modifier) => modifier.getText()).join(" ") + "\n";
  //   }

  return apexCode;
}
