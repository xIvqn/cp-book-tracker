import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

import { interval, Subscription } from 'rxjs';

import { Chapter } from './models/chapter.model';
import { Section } from './models/section.model';
import { ProblemSet } from './models/problem-set.model';
import { Problem } from './models/problem.model';

import { BookService } from './services/book.service';
import { UserService } from './services/user.service';
import { ChapterComponent } from './components/chapter/chapter.component';


const userRefreshInterval = 30000;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ChapterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'CP Book Tracker';
  http = inject(HttpClient);

  user: string = '';
  userRefresh!: Subscription;

  bookEdition: number = 3;
  book: Chapter[] = [];
  solved: number = 0;
  total: number = 0;

  problems: Map<number, Problem> = new Map;
  problemNums: Map<number, number> = new Map;

  bookSpinner: boolean = true;
  userSpinner: boolean = false;

  constructor(private bookService: BookService, private userService: UserService) { }

  ngOnInit() {

    const source = interval(userRefreshInterval);
    this.userRefresh = source.subscribe(() => {
      if (this.user !== '') this.updateSolved();
    });

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
            starred: false,
            solved: false
          })
          this.problemNums.set(problem[0], problem[1]);

        });

        this.selectEdition(this.bookEdition);

      });

  }

  public selectEdition(edition: number) {

    this.bookSpinner = true;
    this.bookEdition = edition;
    this.book = [];

    this.bookService.getBook(this.bookEdition, this.problems).subscribe({
      next: (response) => {

        this.book = response;

        this.solved = 0;
        this.total = 0;

        this.book.forEach((chapter: Chapter) => {
          this.solved += chapter.solved;
          this.total += chapter.total;
        });

        this.bookSpinner = false;

      },
      error: () => this.bookSpinner = false
    });

  }

  public selectUser(f: NgForm) {

    this.userSpinner = true;
    this.user = f.value.user;

    this.problems.forEach((problem) => {
      problem["solved"] = false;
    });

    this.updateSolved();

  }

  private updateSolved() {

    this.userService.getSolved(this.user).subscribe({
      next: (response) => {
        response.forEach((problemId) => {
          let problemNum = this.problemNums.get(problemId);
          let problem = problemNum !== undefined ? this.problems.get(problemNum) : undefined;

          if (problem !== undefined && problemNum !== undefined) { problem["solved"] = true };
        });

        this.book.forEach((chapter: Chapter) => {

          chapter.solved = 0;
          chapter.sections.forEach((section: Section) => {

            section.solved = 0;
            section.problemSets.forEach((problemSet: ProblemSet) => {

              problemSet.solved = 0;
              problemSet.problems.forEach((problem: Problem) => {

                if (problem.solved) {
                  problemSet.solved++;
                };

              });
              section.solved += problemSet.solved;

            });
            chapter.solved += section.solved;

          });
          this.solved += chapter.solved;

        });

        this.userSpinner = false;

      }
    });

  }

}
