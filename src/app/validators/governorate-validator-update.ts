




import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const governorateValidatorUpdate : ValidatorFn = (input : AbstractControl): ValidationErrors | null => {
    
    const governorates = [
        "","tataouine","kebili","medenine","kasserine","gafsa","sfax","sidi bouzid",
        "gabes","kairouan","tozeur","kef","siliana","bizerte","beja","jendouba",
        "mahdia","nabeul","zaghouan","sousse","mannouba","monastir","ben arous",
        "ariana","tunis"
    ];

    return ( ! governorates.includes(input.value.trim().toLowerCase())) ? { notGovernorate: true } : null ;
    
  };