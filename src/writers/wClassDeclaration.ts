import { Node, ClassDeclaration, ConstructorDeclaration } from "ts-morph";
import { ApexClassModifier, ApexClassExtension } from "../apexDef";
import Context from "../context";
import { AbstractKeyword } from "@ts-morph/common/lib/typescript";
import { error } from "console";
import writePropertyDeclaration from "./wPropertyDeclaration";
import { printNode } from "../printer";

// import writePropertyDeclaration from "./wPropertyDeclaration";
// import { printNode } from "../printer";

/* 
  Apex Docs
  
  Class: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_defining.htm
    
  private | public | global 
  [virtual | abstract | with sharing | without sharing] 
  class ClassName [implements InterfaceNameList] [extends ClassName] 
  { 
    // The body of the class
  }
    ---
  Annotations: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation.htm
    Class
      @IsTest(SeeAllData=true)
      @JsonAccess(serializable='samePackage' deserializable=’sameNamespace’)
      @NamespaceAccessible
      @RestResource(urlMapping='/MyRestResource/*')
      @SuppressWarnings

    Method
      @AuraEnabled(cacheable=true scope='global')
      @Deprecated
      @Future (callout=true)
      @HttpDelete
      @HttpGet
      @HttpPatch
      @HttpPost
      @HttpPut
      @InvocableMethod(label='Get Account Names' description='Returns the list of account names corresponding to the specified account IDs.' category='Account')
      @InvocableMethod(label='Convert Leads')
      @IsTest(SeeAllData=true)
      @NamespaceAccessible
      @ReadOnly
      @RemoteAction
      @SuppressWarnings
      @TestSetup
      @TestVisible
*/

export default function writeClassDeclaration(_node: Node, context: Context): string {
  let node = _node as ClassDeclaration;

  let apexCode: string = "";
  let apexBodyCode: string = "";
  let name: string = "";
  let modifier: ApexClassModifier = ApexClassModifier.Private;
  let extension: ApexClassExtension = ApexClassExtension.None;
  let interfaceClassNames: Array<string> = [];
  let extendingClassName: string = "";
  let isAbstract: boolean = false;

  // Get class name
  name = node.getName() || "";
  isAbstract = node.getAbstractKeyword() ? true : false;

  node.getDecorators().forEach((decorator) => {
    const decoratorName = decorator.getFullName().toLowerCase();

    if (decoratorName === "api") {
      // Set API value in context and continue
      const version: number = Number.parseFloat(decorator.getArguments()[0].getText());
      context.setApiVersion(version);
      return;
    }

    switch (decoratorName) {
      case "private":
        modifier = ApexClassModifier.Private;
        break;
      case "public":
        modifier = ApexClassModifier.Public;
        break;
      case "global":
        modifier = ApexClassModifier.Global;
        break;
      case "withsharing":
        extension = ApexClassExtension.WithSharing;
        break;
      case "withoutsharing":
        extension = ApexClassExtension.WithoutSharing;
        break;
      case "inheritedsharing":
        extension = ApexClassExtension.InheritedSharing;
        break;

      default:
      // TODO: Add more checks
      //apexCode += decorator.getFullText().trim() + "\n";
    }
  });

  // Class Interfaces
  // interfaceClassNames.push("InterfaceName");
  // interfaceClassNames.push("AnotherInterfaceName");

  // Class Extending Class
  // extendingClassName = "AbstractClassName";

  /*
     Start generating Apex code
  */

  // Add Comments
  // apexCode += "// Class comments go here\n";

  // Get class decorators

  // Modifier defaults to private
  apexCode += modifier; // private | public | global

  // Extension is optional
  if (extension !== ApexClassExtension.None) {
    apexCode += " " + extension; // virtual | abstract | with sharing | without sharing
  }

  // Name is required
  apexCode += " class " + name;

  // Implements are optional
  if (interfaceClassNames.length > 0) {
    apexCode += " implements " + interfaceClassNames.join(", ");
  }

  // Extending is optional
  if (extendingClassName !== "") {
    apexCode += " extends " + extendingClassName;
  }

  // Add opening body tag
  apexCode += " {\n";
  context.blockLevel++;

  // Add all class members
  const members = node.getProperties();
  if (members.length) {
    apexBodyCode += "// Class variables\n";
    members.forEach((member) => {
      apexBodyCode += writePropertyDeclaration(member, context) + "\n";
    });
    apexBodyCode += "\n";
  }

  const constructors = node.getConstructors();
  if (constructors.length > 1) {
    // Currently only support one constructor. Apex supports multiple constructors with overloading
    throw Error("Class can only have one constructor");
  } else if (constructors.length === 1) {
    const constructor: ConstructorDeclaration = constructors[0];

    /*
      APEX SAMPLE
      ----------------
      // The no argument constructor 
      public ClassName() {
        // more code here
      }
      */
    let parentNode = constructor.getParent() as ClassDeclaration;
    let parentClassName = parentNode.getName() || "";
    let methodApexCode: string = "";

    methodApexCode += "// Class constructor\n";
    methodApexCode += "public " + parentClassName + "(";

    let constructorParams: Array<string> = [];
    constructor.getParameters().map((param) => {
      // TODO. Move out to a separate file
      constructorParams.push(param.getText());
    });

    methodApexCode += constructorParams.join(", ");
    methodApexCode += ")";

    // methodApexCode += constructor.getText() + "\n";
    const body = constructor.getBody();
    if (body) {
      methodApexCode += printNode(body, context);
    } else {
      methodApexCode += ";";
    }

    apexBodyCode += methodApexCode + "\n\n";
  }

  apexBodyCode += "// Class methods\n\n";

  apexCode +=
    "  ".repeat(context.blockLevel) +
    apexBodyCode
      .trim()
      .split("\n")
      .join("\n" + "  ".repeat(context.blockLevel));

  // Add closing body tag
  context.blockLevel--;
  apexCode += "\n}\n";

  return apexCode;
}
