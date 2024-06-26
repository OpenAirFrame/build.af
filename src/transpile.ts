import { Project, SourceFile, ts } from "ts-morph";
import { printApex } from "./printer";
import Context from "./context";
import { transformAST } from "./transform";

export function ts2apex(path: string) {
  const project = new Project({
    // tsConfigFilePath: "path/to/tsconfig.json",
    // skipAddingFilesFromTsConfig: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2015,
    },
  });

  const sourceFile = project.addSourceFileAtPath(path);

  const context: Context = new Context();

  transformAST(sourceFile, context);
  console.log();
  console.log();
  console.log();
  return printApex(sourceFile, context);
}
