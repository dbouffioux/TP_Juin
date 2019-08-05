export class Person {
  id?: number;
  lastname?: string;
  firstname?: string;
  login?: string;
  password?: string;

  public constructor() {
    this.firstname = '';
    this.lastname = '';
    this.login = '';
    this.password = '';
  }
}
