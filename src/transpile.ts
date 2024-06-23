import { Project, ts } from "ts-morph";
import { printApex } from "./printer";

export function ts2apex(path: string) {
  const project = new Project({
    // tsConfigFilePath: "path/to/tsconfig.json",
    // skipAddingFilesFromTsConfig: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2015,
    },
  });

  const sourceFile = project.addSourceFileAtPath(path);

  return printApex(sourceFile);
}
