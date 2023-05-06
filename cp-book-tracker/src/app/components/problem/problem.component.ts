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
    return `http://uva.onlinejudge.org/external/${Math.floor(this.problem.num/100)}/${this.problem.num}.pdf`;
  }

  public udebugLink() {
    return `https://www.udebug.com/UVa/${this.problem.num}`;
  }
  public submitLink() {
    return `https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=submit_problem&problemid=${this.problem.pid}`;
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
