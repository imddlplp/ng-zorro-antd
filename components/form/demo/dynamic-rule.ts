import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-form-dynamic-rule',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSpan]="4" nzRequired nzFor="name">Name</nz-form-label>
        <nz-form-control [nzSpan]="8" nzErrorTip="Please input your name">
          <input type="text" nz-input formControlName="name" placeholder="Please input your name" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="4" nzFor="nickname" [nzRequired]="validateForm.get('required')?.value">
          Nickname
        </nz-form-label>
        <nz-form-control [nzSpan]="8" nzErrorTip="Please input your nickname">
          <input type="text" nz-input formControlName="nickname" placeholder="Please input your nickname" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzSpan]="8" [nzOffset]="4">
          <label nz-checkbox formControlName="required" (ngModelChange)="requiredChange($event)">
            Nickname is required
          </label>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzSpan]="8" [nzOffset]="4">
          <button nz-button nzType="primary">Check</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzDemoFormDynamicRuleComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  requiredChange(required: boolean): void {
    if (!required) {
      this.validateForm.get('nickname')!.clearValidators();
      this.validateForm.get('nickname')!.markAsPristine();
    } else {
      this.validateForm.get('nickname')!.setValidators(Validators.required);
      this.validateForm.get('nickname')!.markAsDirty();
    }
    this.validateForm.get('nickname')!.updateValueAndValidity();
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      nickname: [null],
      required: [false]
    });
  }
}
