import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Section } from 'src/app/models/section.model';
import { ProblemSetComponent } from '../problem-set/problem-set.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, ProblemSetComponent],
  templateUrl: './section.component.html',
  styleUrls: []
})
export class SectionComponent {

  @Input() section!: Section;
  allSolved: boolean = false;

  getSolved(): string {

    this.allSolved = this.section.solved === this.section.total;

    return `${this.section.solved} / ${this.section.total}`;

  }

}
