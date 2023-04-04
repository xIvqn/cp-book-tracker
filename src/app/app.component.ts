import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chapter } from './models/chapter.model';
import { Section } from './models/section.model';
import { ProblemSet } from './models/problem-set.model';
import { Problem } from './models/problem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'cp-book-tracker';
  http = inject(HttpClient);
  chapters: Chapter[] = [];
  problems: Map<number, Problem> = new Map;

  ngOnInit() {

    this.http.get<[]>('https://uhunt.onlinejudge.org/api/p')
      .subscribe((problems) => {
        problems.forEach((problem: any[]) => {
          
          this.problems.set(problem[1], {
            pid: problem[0],
            num: problem[1],
            title: problem[2],
            dacu: problem[3],
            mrun: problem[4],
            mmem: problem[5],
            nover: problem[6],
            sube: problem[7],
            noj: problem[8],
            inq: problem[9],
            ce: problem[10],
            rf: problem[11],
            re: problem[12],
            ole: problem[13],
            tle: problem[14],
            mle: problem[15],
            wa: problem[16],
            pe: problem[17],
            ac: problem[18],
            rtl: problem[19],
            status: problem[20],
            rej: problem[21],
            starred: false
          })

        });

        this.http.get<[]>('https://uhunt.onlinejudge.org/api/cpbook/3')
          .subscribe((chs) => {
            chs.forEach((ch: any) => {
    
              this.chapters.push({
                title: ch["title"],
                sections: this.buildSections(ch["arr"])
              })
    
            });
          });

      });

  }

  private buildSections(secs: []) {
  
    let sections: Section[] = [];
  
    secs.forEach((section: any) => {
  
      sections.push({
        title: section["title"],
        problemSets: this.buildProblemSets(section["arr"])
      })
  
    });
  
    return sections;
  
  }
  
  private buildProblemSets(prbs: []) {
  
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
  
  private buildProblems(prs: number[]) {
  
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
