import { ChildFormComponent } from './../child-form/child-form.component';
import { RestapiService } from './../restapi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseFormComponent } from '../base-form.component';

@Component({
  selector: 'app-root-form',
  templateUrl: './root-form.component.html',
  styleUrls: ['./root-form.component.css']
})
export class RootFormComponent extends BaseFormComponent {
  private _rootFormGroup: FormGroup;
  private _namesFormGroup: FormGroup;

  @ViewChild(ChildFormComponent)
  private _childForm: ChildFormComponent;

  constructor(
    formsBuilder: FormBuilder,
    rest: RestapiService
  ) {
    super(formsBuilder, rest);
  }


  public save(): void {

  }


  public get canSave(): boolean {
    return this._rootFormGroup &&
      this._rootFormGroup.dirty &&
      this._rootFormGroup.valid &&
      (this._childForm && !this._childForm.isBusy);
  }


  public get namesFormGroup(): FormGroup {
    return this._namesFormGroup;
  }


  public get rootFormGroup(): FormGroup {
    return this._rootFormGroup;
  }


  public ngOnInit(): void {
    this._namesFormGroup = ChildFormComponent.createRootFormGroup(this.formBuilder);
    this._rootFormGroup = this.formBuilder.group({
      year: [(new Date()).getFullYear()],
      names: this._namesFormGroup
    });
  }

}
