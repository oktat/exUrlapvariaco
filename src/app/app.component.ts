import { Component } from '@angular/core';
import { 
  FormArray, 
  FormBuilder, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app01';

  employeeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: this.formBuilder.group({
        city: '',
        street: ''
      }),
      salary: '',
      phones: this.formBuilder.array([])
    })
  }

  onSubmit() {
    if(this.employeeForm.valid) {
      console.log(this.employeeForm.value);
    }
  }
  get phones(): FormArray {
    return this.employeeForm.get('phones') as FormArray;
  }


  addPhone() {
    this.phones.push(this.newPhone());
  }

  newPhone(): FormGroup {
    return this.formBuilder.group({
      type: '',
      phone: ''
    });
  }

  removePhone(i: number) {
    this.phones.removeAt(i);
  }

}
