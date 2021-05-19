


import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const passwordValidator : ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
   
    const password = control.get('password');
    const repassword = control.get('repassword');
  
    return password && repassword && password.value !== repassword.value ? { passwordsDontMatch: true } : null;
  };