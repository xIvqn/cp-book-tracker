import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemSet } from 'src/app/models/problem-set.model';
import { ProblemComponent } from '../problem/problem.component';

@Component({
  selector: 'app-problem-set',
  standalone: true,
  imports: [CommonModule, ProblemComponent],
  templateUrl: './problem-set.component.html',
  styleUrls: []
})
export class ProblemSetComponent {

  @Input() problemSet!: ProblemSet;

  getSolved(): string {
    return `${this.problemSet.solved} / ${this.problemSet.total}`;
  }

}
