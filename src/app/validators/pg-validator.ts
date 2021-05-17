




import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const pgValidator : ValidatorFn = (date : AbstractControl): ValidationErrors | null => {
    
    const diff_ms = Date.now() - new Date( date.value ).getTime();
    const age_dt = new Date(diff_ms); 

    return (Math.abs(age_dt.getUTCFullYear() - 1970) < 16) ? { notOldEnough: true } : null ;
    
  };