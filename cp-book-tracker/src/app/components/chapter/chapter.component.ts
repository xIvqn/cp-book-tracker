import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chapter } from 'src/app/models/chapter.model';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [CommonModule, SectionComponent],
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent {

  @Input() chapter!: Chapter;
  allSolved: boolean = false;

  getSolved(): string {

    this.allSolved = this.chapter.solved === this.chapter.total;

    return `${this.chapter.solved} / ${this.chapter.total}`;

  }

}
