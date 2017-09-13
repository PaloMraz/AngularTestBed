import { RestapiService } from './../restapi.service';
import { Component, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { BaseFormComponent } from '../base-form.component';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.css']
})
export class ChildFormComponent extends BaseFormComponent {
  private _namesFormArray: FormArray;
  private _rootFormGroup: FormGroup;
  private _availableNames: string[] = [];


  public static createRootFormGroup(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      names: formBuilder.array([])
    });
  }


  public static populateRootFormGroup(formBuilder: FormBuilder, rootFormGroup: FormGroup, names: string[]): void {
    const array = <FormArray>rootFormGroup.controls['names'];
    while (array.length > 0) {
      array.removeAt(0);
    }
    names.forEach(name => {
      array.push(formBuilder.group({
        name: name
      }));
    });
  }


  public constructor(
    formBuilder: FormBuilder,
    rest: RestapiService
  ) {
    super(formBuilder, rest);
  }


  @Input()
  public set rootFormGroup(value: FormGroup) {
    this._rootFormGroup = value;
    this._namesFormArray = <FormArray>value.controls['names'];
    this.refreshNames();
  }


  public get rootFormGroup(): FormGroup {
    return this._rootFormGroup;
  }


  public get namesFormArray(): FormArray {
    return this._namesFormArray;
  }


  public get canAddName(): boolean {
    return this._availableNames && (this._availableNames.length > 0);
  }


  public addName(): void {
    this._namesFormArray.push(this.formBuilder.group({name: this._availableNames[0]}));
    this._availableNames.splice(0, 1);
    this._rootFormGroup.markAsDirty();
  }


  private refreshNames(): void {
    this.executeServiceRequest(
      () => this.rest.getUserNames(), names => {
        this._availableNames = names;
      });
  }



}
