import { Component, Input } from '@angular/core';
import { Chapter } from 'src/app/models/chapter.model';

@Component({
  selector: 'app-chapter',
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
