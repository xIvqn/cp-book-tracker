import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chapter } from '../models/chapter.model';
import { ProblemSet } from '../models/problem-set.model';
import { Problem } from '../models/problem.model';
import { Section } from '../models/section.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  problems!: Map<number, Problem>;
  url: string = "https://uhunt.onlinejudge.org/api/cpbook";

  constructor(private httpClient: HttpClient) { }

  public getBook(edition: number, problems: Map<number, Problem>): Chapter[] {

    this.problems = problems;
    let book: Chapter[] = [];

    this.httpClient.get<[]>(`${this.url}/${edition}`)
      .subscribe((chs) => {
        chs.forEach((ch: any, index: number) => {

          book.push({
            title: ch["title"],
            sections: this.buildSections(ch["arr"]),
            id: `chapter-${index}`
          })

        });
      });

    return book;

  }

  private buildSections(secs: []): Section[] {

    let sections: Section[] = [];

    secs.forEach((section: any) => {

      sections.push({
        title: section["title"],
        problemSets: this.buildProblemSets(section["arr"])
      })

    });

    return sections;

  }

  private buildProblemSets(prbs: []): ProblemSet[] {

    let problemSets: ProblemSet[] = [];

    prbs.forEach((problemSet: any[]) => {

      if (problemSet.length > 0) {

        problemSets.push({
          title: problemSet[0],
          problems: this.buildProblems(problemSet.splice(1))
        })

      }

    });

    return problemSets;

  }

  private buildProblems(prs: number[]): Problem[] {

    let problems: Problem[] = [];

    prs.forEach((id: number) => {

      let starred = id < 0;
      let problem = this.problems.get(Math.abs(id));

      if (problem !== undefined) {
        problem["starred"] = starred;
        problems.push(problem);
      }

    });

    return problems;

  }

}
