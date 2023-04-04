import { Component, Input } from '@angular/core';
import { Problem } from '../../models/problem.model';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent {

  @Input() problem!: Problem;

  public openpdf() {
    window.open(`http://uva.onlinejudge.org/external/${Math.floor(this.problem.num/100)}/${this.problem.num}.pdf`, "_blank");
  }

}
