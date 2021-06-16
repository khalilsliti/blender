


import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const passwordValidatorUpdate : ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
   
    const password = control.get('newPassword');
    const repassword = control.get('repassword');
  
    return password && repassword && password.value !== repassword.value ? { passwordsDontMatch: true } : null;
  };