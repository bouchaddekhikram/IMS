import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private subject = new Subject<{ message: string }>();

  // Method to show a toast message
  show(message: string) {
    this.subject.next({ message });
  }

  // Method to get the observable for toast messages
  getMessage() {
    return this.subject.asObservable();
  }
}
