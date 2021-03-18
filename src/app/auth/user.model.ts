export class User {

  public name: string;
  public email: string;
  public uid: string;

  constructor( obj: DataObj) {
    this.name = obj && obj.name || null;
    this.email = obj && obj.email || null;
    this.uid = obj && obj.uid || null;
  }

}

export interface DataObj {
  email: string;
  name: string;
  uid: string;
}
