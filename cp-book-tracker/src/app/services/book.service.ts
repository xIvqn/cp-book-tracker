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
    let solved: number = 0;
    let total: number = 0;

    this.httpClient.get<[]>(`${this.url}/${edition}`)
      .subscribe((chs) => {
        chs.forEach((ch: any, index: number) => {

          let buildSections = this.buildSections(ch["arr"]);

          book.push({
            title: ch["title"],
            sections: buildSections["sections"],
            total: buildSections["total"],
            solved: buildSections["solved"],
            id: `chapter-${index}`
          })

          solved += buildSections["solved"]
          total += buildSections["total"]

        });
      });

    return book;

  }

  private buildSections(secs: []): { sections: Section[], solved: number, total: number } {

    let sections: Section[] = [];
    let solved: number = 0;
    let total: number = 0;

    secs.forEach((section: any) => {

      let buildProblemSets = this.buildProblemSets(section["arr"]);

      sections.push({
        title: section["title"],
        problemSets: buildProblemSets["problemSets"],
        total: buildProblemSets["total"],
        solved: buildProblemSets["solved"]
      })

      solved += buildProblemSets["solved"]
      total += buildProblemSets["total"]

    });

    return { sections, solved, total };

  }

  private buildProblemSets(prbs: []): { problemSets: ProblemSet[], solved: number, total: number } {

    let problemSets: ProblemSet[] = [];
    let solved: number = 0;
    let total: number = 0;

    prbs.forEach((problemSet: any[]) => {

      if (problemSet.length > 0) {

        let buildProblems = this.buildProblems(problemSet.splice(1));

        problemSets.push({
          title: problemSet[0],
          problems: buildProblems["problems"],
          total: buildProblems["problems"].length,
          solved: buildProblems["solved"]
        })

        solved += buildProblems["solved"]
        total += buildProblems["problems"].length

      }

    });

    return { problemSets, solved, total };

  }

  private buildProblems(prs: number[]): { problems: Problem[], solved: number } {

    let problems: Problem[] = [];
    let solved = 0;

    prs.forEach((id: number) => {

      let starred = id < 0;
      let problem = this.problems.get(Math.abs(id));

      if (problem !== undefined) {
        if (starred) solved++;
        problem["starred"] = starred;
        problems.push(problem);
      }

    });

    return { problems, solved };

  }

}
