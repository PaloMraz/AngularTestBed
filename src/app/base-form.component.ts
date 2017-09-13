import { RestapiService } from './restapi.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

export abstract class BaseFormComponent implements OnInit {

  private _serviceRequestCounter = 0;
  private _lastServiceRequestError: any = null;



  protected constructor(
    private _formBuilder: FormBuilder,
    private _rest: RestapiService
  ) {

  }

  public get isBusy(): boolean {
    return this.isBusyCore();
  }


  public get lastServiceRequestError(): any {
    return this._lastServiceRequestError;
  }


  /**
   * Metóda pre volanie z potomka ak potrebuje overridovať isBusy, pretože getters sa overridovať
   * nedajú. FMI: https://github.com/Microsoft/TypeScript/issues/338
   */
  protected isBusyCore() {
    return (this._serviceRequestCounter > 0);
  }

  /**
   * Volať pred volaním backendu.
   */
  protected serviceRequestStarted() {
    this._serviceRequestCounter++;
  }


  /**
   * Volať po ukončení volania backendy (typicky v rámci finally Rx operátora).
   */
  protected serviceRequestStopped() {
    if (this._serviceRequestCounter > 0) {
      this._serviceRequestCounter--;
    }
  }


  /**
   * Zavolá servis a zabezpečí jednak nastavenie isBusy príznaku a volanie onSuccess a onError callbacks.
   */
  protected executeServiceRequest<T>(
    requestFactory: () => Observable<T>,
    onSuccess: (data: T) => void,
    onError: (error: any) => void = null): Observable<T> {

    this._lastServiceRequestError = null;
    this.serviceRequestStarted();

    const result: Observable<T> = requestFactory().finally(() => {
      this.serviceRequestStopped();
    });
    result.subscribe(
      data => {
        onSuccess(data);
      },
      error => {
        this._lastServiceRequestError = error;
        if (onError) {
          onError(error);
        }
    });
    return result;
  }

  public ngOnInit() {
  }

  protected get rest(): RestapiService {
    return this._rest;
  }

  protected get formBuilder(): FormBuilder {
    return this._formBuilder;
  }

}
