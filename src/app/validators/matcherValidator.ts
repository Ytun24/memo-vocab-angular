import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

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
