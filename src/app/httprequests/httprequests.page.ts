import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError, Subscription, Subject } from 'rxjs';
import { retry, catchError, takeUntil } from 'rxjs/operators';

export class User {
  message: string;
}

@Component({
  selector: 'app-httprequests',
  templateUrl: './httprequests.page.html',
  styleUrls: ['./httprequests.page.scss'],
})
export class HttprequestsPage implements OnInit, OnDestroy {

  private backendURL = 'https://localhost:8100/api';
  private requestoptions = {
    observe: 'body' as const,
    method: 'GET',
  };
  private destroy$ = new Subject();

  constructor(private httpclient: HttpClient) {
   }

  ngOnInit(){
  }

  processError(err) {
    let message = '';
    if(err.error instanceof ErrorEvent) {
     message = err.error.message;
    } else {
     message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
 }


  observeRequest(): Observable<User> {
  return this.httpclient.get<User>(this.backendURL,this.requestoptions)
  .pipe(retry(1), catchError(this.processError), takeUntil(this.destroy$));
  }

  getRequest(){
    this.observeRequest().subscribe(val => console.log(val));

  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

}
