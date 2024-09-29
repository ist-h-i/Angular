import { Component } from '@angular/core';
import { FormGroup, FormArray, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';

/**
 * formArrayを使用して複数のフォームコントロールを生成する
 * formArrayの長さが0の場合、atLeastOneItemValidatorによってエラーを返す
 */
@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})

export class FormsComponent {

  myForm: FormGroup;

  /**
   * formArrayを取得する
   */
  get items(): FormArray {
    return this.myForm.get('items') as FormArray;
  }

  /**
   * constructor
   */
  constructor() {
    /**
     * formArrayを生成する
     * formArrayの長さが0の場合、atLeastOneItemValidatorによってエラーを返す
     */
    this.myForm = new FormGroup({
      items: new FormArray([], this.atLeastOneItemValidator())
    });
  }

  /**
   * formArrayに新しいFormControlを追加
   *
   * @remarks
   *  - FormControlのvalueは空文字列
   *  - FormControlにはrequiredとminLength(3)のValidatorを追加
   */
  addItem(): void {
    this.items.push(new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ));
  }

  /**
   * formArrayの最後尾のFormControlを削除
   */
  removeItem(): void {
    this.items.removeAt(this.items.length - 1);
  }

  /**
   * formArrayの長さが0の場合、atLeastOneItemValidatorによってエラーを返す
   * @param control formArray
   * @returns null or { atLeastOneItem: true }
   */
  private atLeastOneItemValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;
      return formArray.controls.length > 0 ? null : { atLeastOneItem: true };
    };
  }
}

