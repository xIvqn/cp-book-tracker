import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vcontest } from '../models/vcontest.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VcontestService {

  url: string = "https://uhunt.onlinejudge.org/vcontest-gen";

  constructor(private httpClient: HttpClient) { }

  public createVcontest(vcontest: Vcontest): Observable<Vcontest> {
    
    return new Observable<Vcontest>((subscriber) => {
  
      this.httpClient.post<any>(`${this.url}`, null, {
        params: new HttpParams().appendAll({
          "problem_numbers": vcontest.problem_numbers.join(","),
          "user_ids": vcontest.user_ids.join(","),
          "start_sbt": vcontest.start_sbt.toString(),
          "end_sbt": vcontest.end_sbt.toString()
        })
      }).subscribe((response) => {
          if (response["ok"] == "false") {
            subscriber.error("Could not create vcontest");
          }

          vcontest.id = response["id"]!;
          subscriber.next(vcontest);
        });

    });

  }
}
