import { Component, Input } from '@angular/core';
import { Problem } from '../../models/problem.model';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent {

  @Input() problem!: Problem;

}
