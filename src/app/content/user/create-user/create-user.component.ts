import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/user';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm;
  user: User;
  options: string[] = ['Admin', 'QA', 'DV'];
  constructor(private userService: UserService,
              private formBuilder: FormBuilder, public snackBar: MatSnackBar
  ) {
    this.userForm = this.formBuilder.group({
      id: new FormControl(null),
      name: new FormControl(''),
      role: new FormControl(''),
      jenkinsPassword: new FormControl('')
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.user = new User();
    this.user.name = this.userForm.value.name;
    this.user.role = this.userForm.value.role;
    this.user.jenkinsAPIToken = '00';
    this.user.jenkinsName = this.userForm.value.name;
    this.user.jenkinsPassword = this.userForm.value.jenkinsPassword;
    this.user.id = -1;
    this.sendUser( this.user );
  }

  sendUser(user: User): void {
    this.userService.createUser( this.user ).subscribe(
      res => {
          this.openSnackbar('Database has been updated');
      },
      error => {
        this.openSnackbar('An error had occurred while making user');
      });
  }

  openSnackbar(message) {
    const config = new MatSnackBarConfig();

    config.duration = 3000;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top';
    this.snackBar.open(message, 'OK', config);
  }
}
