class DefaultPerson {
  id: Id;
  name: string = "";
  age: integer = 0;
  height: double = 0;
  public pubicName: string = "";
  private static privateAge: number = 0;
  protected protectedNames: Array<string> = [];
  static readonly staticAge: boolean = false;
}

// @WithSharing
// @Private
// @IsTest
// abstract class PrivatePerson {
//   name: string;
//   age: number;
// }

// @IsTest
// @InheritedSharing
// class PublicPerson {
//   name: string;
//   age: number;
// }

// @Global
// @WithoutSharing
// class GlobalPerson {
//   name: string;
//   age: number;
// }
