import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ProblemComponent } from './components/problem/problem.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { SectionComponent } from './components/section/section.component';
import { ProblemSetComponent } from './components/problem-set/problem-set.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemComponent,
    ChapterComponent,
    SectionComponent,
    ProblemSetComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
