import { Project, ts } from "ts-morph";

const project = new Project({
  // tsConfigFilePath: "path/to/tsconfig.json",
  // skipAddingFilesFromTsConfig: true,
  compilerOptions: {
    target: ts.ScriptTarget.ES2015,
  },
});

const sourceFile = project.addSourceFileAtPath("../examples/src.ts");

console.log("sourceFile: ", sourceFile.getClasses());

// Statements - getStatements()
// Classes - getClasses()
// Functions - getFunctions()
// Interfaces - getInterfaces()
// Enums - getEnums()
// Modules - getModules()
// TypeAliases - getTypeAliases()
// VariableStatements - getVariableStatements()

/*
// const program = project.createProgram();
// const typeChecker = program.getTypeChecker();

// Loop through all the nodes in the sourceFile AST and print their symbol to the console
const parse = (node: any, level: number = 0) => {
  console.log(" ".repeat(level), ts.SyntaxKind[node.kind]);

  if (node.symbol) {
    //   console.log(" ".repeat(level), "symbol: ", typeChecker.getSymbolAtLocation(child));
    console.log(" ".repeat(level), " -> XXX SYMBOL");
  }
  const symbol = typeChecker.getSymbolAtLocation(node);
  if (symbol) {
    //   console.log(" ".repeat(level), "symbol: ", typeChecker.getSymbolAtLocation(child));
    console.log(" ".repeat(level), " -> GOT SYMBOL");
  }

  node.forEachChild((child: any) => {
    parse(child, level + 1);
  });
};

parse(sourceFile);

process.exit();
//console.log(new Person('Jane').greet());
// let sourceFile = ts.createSourceFile(
//   "afilename.ts",
//   src,
//   ts.ScriptTarget.ES5,
//    true,
//   ts.ScriptKind.TS
// );

// let program = ts.createProgram(fileNames, options);
// let checker = program.getTypeChecker();

function parseNode(node: ts.Node, level: number = 0) {
  if (node.kind == ts.SyntaxKind.SourceFile) {
    // console.log(" *** SourceFile");
  } else if (node.kind == ts.SyntaxKind.EndOfFileToken) {
    // console.log(" *** EndOfFileToken");
  }
  //
  else if (node.kind == ts.SyntaxKind.Identifier) {
    console.log(" ".repeat(level), " Identifier:", node.getText());
  }
  // Types
  else if (node.kind == ts.SyntaxKind.StringKeyword) {
    console.log(" ".repeat(level), " StringKeyword:", node.getText());
  } else if (node.kind == ts.SyntaxKind.NumberKeyword) {
    console.log(" ".repeat(level), " NumberKeyword:", node.getText());
  }

  //ts.isClassDeclaration(
  // Symbol
  //
  else {
    console.log(" ".repeat(level), ts.SyntaxKind[node.kind]);
    // const symbol = ts.getSymbolAtLocation(node);
    const symbol = typeChecker.getSymbolAtLocation(node);
    console.log("symbol: ", symbol);
  }

  node.forEachChild((child) => {
    parseNode(child, level + 1);
  });
}

// console.log("");
parseNode(sourceFile);
// console.log("");
// ts.forEachChild(node, delintNode);

// console.log(sourceFile.statements);
*/
