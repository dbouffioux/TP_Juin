import { FormGroup } from '@angular/forms';


export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {

    const config = {
      required: 'Requis',
      invalidEmailAddress: 'Adresse email invalide',
      invalidPassword: 'Le mot de passe doit être de minimum 6 caractères de long avec un chiffre.',
      minlength: `Longueur minimum: ${validatorValue.requiredLength}`,
      maxlength: `Longueur maximum ${validatorValue.requiredLength}`,
      pastDate: 'Date passée non autorisée',
      finishIsAfterBegin: 'Date de fin doit être supérieur à la date de début'
    };
    return config[validatorName];
  }

  static finishIsAfterBegin(control) {
    if (Date.parse(control.get('finish')) > Date.parse(control.get('begin'))) {
      return null;
    } else {
      return { finishIsAfterBegin : true };
    }
  }

  static isFuturDate(control) {
    const now = Date.now();
    if (Date.parse(control.value) > now) {
      return null;
    } else {
      return { pastDate: true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    // tslint:disable-next-line:max-line-length
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static passwordValidator(control) {

    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }
}

