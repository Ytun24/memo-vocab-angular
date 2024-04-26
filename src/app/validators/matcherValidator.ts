import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function matcherValidator(
  controlName1: string,
  controlName2: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const control1 = control.get(controlName1)!;
    const matchingControl = control.get(controlName2)!;
    return control1.value !== matchingControl.value
      ? { matcherValidator: true }
      : null;
  };
}
