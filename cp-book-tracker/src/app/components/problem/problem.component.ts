import { Component, Input } from '@angular/core';
import { Problem } from '../../models/problem.model';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent {

  @Input() problem!: Problem;

  public uvaLink() {
    return `https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=${this.problem.pid}`;
  }

  public setClasses() {
    return {
      'text-white': (!this.problem.starred && (this.problem.status !== 0)) || this.problem.solved,
      'bg-light-subtle': !this.problem.starred && (this.problem.status !== 0) && !this.problem.solved,
      'text-dark': (this.problem.starred || this.problem.status === 0) && !this.problem.solved,
      'bg-warning': this.problem.starred && (this.problem.status !== 0) && !this.problem.solved,
      'bg-danger':  this.problem.status === 0 && !this.problem.solved,
      'bg-success':  this.problem.solved
    };
  }

}
