import { Component, Input } from '@angular/core';
import { Section } from 'src/app/models/section.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {

  @Input() section!: Section;

}
