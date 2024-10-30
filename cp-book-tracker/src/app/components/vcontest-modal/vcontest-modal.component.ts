import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vcontest-modal',
  templateUrl: './vcontest-modal.component.html'
})
export class VcontestModalComponent {

  public userList: string[] = [];
  private ids: string[] = [];

  constructor(private userService: UserService) { }

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

  public onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.value.start_time);
    console.log(f.value.end_time);
    console.log(this.ids);
  }

  private toggleToast(toastId: string, seconds: number) {
    document.getElementById(toastId)!.classList.add('show');
    setTimeout(() => {
      document.getElementById(toastId)!.classList.remove('show');
    }, seconds * 1000);
  }

}
