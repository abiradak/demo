import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  private messageSource = new BehaviorSubject("");
  currentMessage = this.messageSource.asObservable();
  loading: any;

  emitChange(data: string) {
    this.emitChangeSource.next(data);
  }

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
