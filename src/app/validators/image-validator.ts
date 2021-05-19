


import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const maxFileSize = 5 * 1024 *1024 ;

export const imageValidator : (file : File) => ValidatorFn = (file : File) => {


    return (control: AbstractControl): ValidationErrors | null => {
   
    if(! file)
        return null ;
        
    const size = file.size ;
    const extension = file.name.slice(file.name.indexOf('.') + 1).toLowerCase();
        
    return extension !== 'jpg' || size > maxFileSize ? { imageNotAcceptable: true } : null;
  };
}