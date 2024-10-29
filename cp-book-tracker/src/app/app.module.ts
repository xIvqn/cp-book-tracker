import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProblemComponent } from './components/problem/problem.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { SectionComponent } from './components/section/section.component';
import { ProblemSetComponent } from './components/problem-set/problem-set.component';
import { VcontestModalComponent } from './components/vcontest-modal/vcontest-modal.component';

@NgModule({ declarations: [
        AppComponent,
        ProblemComponent,
        ChapterComponent,
        SectionComponent,
        ProblemSetComponent,
        VcontestModalComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
