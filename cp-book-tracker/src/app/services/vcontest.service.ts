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

    let httpParams = new HttpParams().appendAll({
      "start_sbt": vcontest.start_sbt.toString(),
      "end_sbt": vcontest.end_sbt.toString()
    });
    vcontest.problem_numbers.forEach((problem_number) => {
      httpParams = httpParams.append("problem_numbers", problem_number.toString());
      console.log(problem_number);
    });
    vcontest.user_ids.forEach((user_id) => {
      httpParams = httpParams.append("user_ids", user_id.toString());
    });
    
    
    return new Observable<Vcontest>((subscriber) => {
  
      this.httpClient.post<any>(`${this.url}`, null, {
        params: httpParams
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
