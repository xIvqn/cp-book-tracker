import { Component, Input } from '@angular/core';
import { ProblemSet } from 'src/app/models/problem-set.model';

@Component({
  selector: 'app-problem-set',
  templateUrl: './problem-set.component.html',
  styleUrls: ['./problem-set.component.css']
})
export class ProblemSetComponent {

  @Input() problemSet!: ProblemSet;

  getSolved(): string {
    return `${this.problemSet.solved} / ${this.problemSet.total}`;
  }

}
