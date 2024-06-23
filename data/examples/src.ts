class DefaultPerson {
  id: ID;
  name: string = "abc";
  age: integer = 0;
  height: double = 1000.5;
  public publicName: string = "";
  private static privateAge: number = 0;
  protected protectedNames: Array<string>;
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
