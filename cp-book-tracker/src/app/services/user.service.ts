import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "https://uhunt.onlinejudge.org/api";

  constructor(private httpClient: HttpClient) { }

  public getSolved(username: string): Observable<number[]> {
    
    return new Observable<number[]>((subscriber) => {
      
      let solved: number[] = [];

      this.httpClient.get<number>(`${this.url}/uname2uid/${username}`)
        .subscribe((id) => {

          this.httpClient.get<any[]>(`${this.url}/solved-bits/${id}`)
            .subscribe((data) => {
      
              if (id !== 0 && data !== undefined && data.length > 0) {
                data = data[0]["solved"]!;
                let i = 0;
      
                data.forEach((x) => {
                  for (let j = 0; j < 32; j++) {
                    if (((x >> j) & 1) == 1) solved.push(i * 32 + j);
                  }
                  i++;
                });
      
              }
              
            });

        });
        

        subscriber.next(solved);

    });

  }

}
