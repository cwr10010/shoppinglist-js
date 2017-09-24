export class RegistrationData {

  constructor(username: string, password: string, passwpord_repeated: string, email_address: string) {
    this.username = username;
    this.password = password;
    this.password_repeated = passwpord_repeated;
    this.email_address = email_address;
  }

  username: string;

  password: string;

  password_repeated: string;

  email_address: string;
}
