import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vcontest } from 'src/app/models/vcontest.model';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { VcontestService } from 'src/app/services/vcontest.service';

@Component({
  selector: 'app-vcontest-modal',
  templateUrl: './vcontest-modal.component.html'
})
export class VcontestModalComponent {

  public userList: string[] = [];
  private ids: string[] = [];
  public vcontest: Vcontest | undefined;
  @ViewChild('vcontestForm') vcontestForm!: NgForm;

  constructor(private userService: UserService, private bookService: BookService, private vcontestService: VcontestService) { }

  ngAfterViewInit() {
    const defaultStartDate = new Date(new Date().getTime() + 5 * 60 * 1000);          // 5 minutes later
    const defaultEndDate = new Date(defaultStartDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours later

    setTimeout(() => {
      this.vcontestForm.form.patchValue({
        end_type: "duration",
        start_date: defaultStartDate.toISOString().slice(0, 10),
        end_date: defaultEndDate.toISOString().slice(0, 10),
        start_time: defaultStartDate.toTimeString().slice(0, 5),
        end_time: defaultEndDate.toTimeString().slice(0, 5),
        duration: "3h"
      });
    }, 1000);
  }

  public onUserInput(event: KeyboardEvent) {

    const inputValue = (event.target as HTMLInputElement).value;

    // Check if the last character is a comma
    if (inputValue.endsWith(',')) {
      // Extract the users between commas
      const users = inputValue.slice(0, inputValue.length-1).split(',');

      users.forEach((user) => {
        const trimmedUser = user.trim();

        if (trimmedUser.length < 1) {
          return;
        }
        
        // Get the user id and add it to the list if it is valid
        this.userService.getId(trimmedUser).subscribe((id) => {
          if (id == 0) {
            this.toggleToast('incorrectUserToast', 5);
          } else if (this.ids.includes(id.toString())) {
            this.toggleToast('repeatedUserToast', 5);
          } else {
            this.ids.push(id.toString());
            this.userList.push(`${trimmedUser} (#${id})`);
            this.toggleToast('userAddedToast', 2);
          }
        });
      });

      // Clear the input field after processing
      (event.target as HTMLInputElement).value = '';
    }

  }

  public removeUser(user: string) {
    const index = this.userList.indexOf(user);
    this.userList.splice(index, 1);
    this.ids.splice(index, 1);
  }

  private selectProblemNums(): number[] {
    let problems: number[] = [];

    for (let i = 0; i < 5; i++) {
      let chapter = this.bookService.book[Math.floor(Math.random() * this.bookService.book.length)];
      let section = chapter.sections[Math.floor(Math.random() * chapter.sections.length)];
      let problemSet = section.problemSets[Math.floor(Math.random() * section.problemSets.length)];
      let problem = problemSet.problems[Math.floor(Math.random() * problemSet.problems.length)];
      
      problems.push(problem["num"]);
    }

    return problems;
  }

  public onSubmit(vcontestForm: NgForm) {
    if (this.userList.length < 1) {
      this.toggleToast('minUserToast', 5);
      return;
    }
    
    if (vcontestForm.value.start_time.length === 0 || (vcontestForm.value.end_time.length === 0 && vcontestForm.value.duration.length === 0)) {
      this.toggleToast('invalidTimesToast', 5);
      return;
    }

    const start_time = new Date(`${vcontestForm.value.start_date} ${vcontestForm.value.start_time}`);
    const currentDate = new Date();
    const selectedOption = vcontestForm.value.end_type;
    const duration = vcontestForm.value.duration;
    let end_time = new Date();

    if (selectedOption == "end_time") {
      end_time = new Date(`${vcontestForm.value.end_date} ${vcontestForm.value.end_time}`);
    } else if (selectedOption == "duration") {
      end_time = this.getDateFromDuration(start_time, duration);
    } else {
      this.toggleToast('invalidTimesToast', 5);
      return;
    }
    

    if (start_time >= end_time || start_time < currentDate) {
      this.toggleToast('invalidTimesToast', 5);
      return;
    }

    let problems = this.selectProblemNums();

    const vcontest: Vcontest = {
      id: undefined,
      start_sbt: start_time.getTime() / 1000,
      end_sbt: end_time.getTime() / 1000,
      problem_numbers: problems,
      user_ids: this.ids.map(Number)
    };

    this.vcontestService.createVcontest(vcontest).subscribe((vcontest) => {
      this.vcontest = vcontest;
    
      this.toggleToast('vcontestCreatedToast', 10);
    });
  }

  private getDateFromDuration(startTime: Date, duration: string) {
    let endDate = new Date();
    let units = 1000;

    switch (duration.charAt(duration.length - 1)) {
      case "m": units *= 60; break;
      case "h": units *= 60 * 60; break;
      case "d": units *= 60 * 60 * 24; break;
      default: return endDate;
    }    

    endDate.setTime(startTime.getTime() + parseInt(duration) * units);

    return endDate;
  }

  private setHourToCurrentDate(hour: string) {
    const [hours, minutes] = hour.split(':').map(Number);

    const currentDate = new Date();
    currentDate.setHours(hours, minutes, 0, 0);

    return currentDate;
  }

  private toggleToast(toastId: string, seconds: number) {
    document.getElementById(toastId)!.classList.add('show');
    setTimeout(() => {
      document.getElementById(toastId)!.classList.remove('show');
    }, seconds * 1000);
  }

  public timestampToDate(timestamp: number) {
    return new Date(timestamp).toLocaleString();
  }

}
