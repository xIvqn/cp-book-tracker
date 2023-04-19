import { Component, Input } from '@angular/core';
import { Section } from 'src/app/models/section.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {

  @Input() section!: Section;
  allSolved: boolean = false;

  getSolved(): string {
    
    this.allSolved = this.section.solved === this.section.total;

    return `${this.section.solved} / ${this.section.total}`;

  }

}
