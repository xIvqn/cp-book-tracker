import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vcontest-modal',
  templateUrl: './vcontest-modal.component.html'
})
export class VcontestModalComponent {

  public userList: string[] = [];
  private ids: string[] = [];
  public vcontestId: string = '';

  constructor(private userService: UserService, private bookService: BookService) { }

  public onUserInput(event: KeyboardEvent) {

    const inputValue = (event.target as HTMLInputElement).value;

    // Check if the last character is a comma
    if (inputValue.endsWith(',')) {
      // Extract the last user before the comma
      const lastUser = inputValue.substring(0, inputValue.length - 1).trim();

      // Call your desired function with the extracted user
      this.userService.getId(lastUser).subscribe((id) => {
        if (id == 0) {
          this.toggleToast('incorrectUserToast', 5);
        } else if (this.ids.includes(id.toString())) {
          this.toggleToast('repeatedUserToast', 5);
        } else {
          this.ids.push(id.toString());
          this.userList.push(`${lastUser} (#${id})`);
          this.toggleToast('userAddedToast', 2);
        }
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

  public onSubmit(f: NgForm) {
    if (this.userList.length < 1) {
      this.toggleToast('minUserToast', 5);
      return;
    }
    
    if (f.value.start_time.length === 0 || f.value.end_time.length === 0) {
      this.toggleToast('invalidTimesToast', 5);
      return;
    }

    const start_time = this.setHourToCurrentDate(f.value.start_time);
    const end_time = this.setHourToCurrentDate(f.value.end_time);
    const currentDate = new Date();

    if (start_time >= end_time || start_time < currentDate) {
      this.toggleToast('invalidTimesToast', 5);
      return;
    }

    let problems = this.selectProblemNums();
    console.log(problems.join(","));
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

}
