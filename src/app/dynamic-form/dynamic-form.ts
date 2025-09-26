import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormData } from '../service/form-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicForm implements OnInit {
  @Input() schema: any[] = [];
  @Input() formType: 'A' | 'B' = 'A';
  form: FormGroup | any;
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  passwordVisibility = signal<{[key: string]: boolean}>({});

  constructor(private fb: FormBuilder, private formDataService: FormData) {}

  ngOnInit(): void {
    this.createForm();
    this.loadFormData();
  }

  createForm(): void {
    const group: any = {};
    
    this.schema.forEach(field => {
      let validators = [];
      if (field.required) {
        validators.push(Validators.required);
      }
      if (field.type === 'email') {
        validators.push(Validators.email);
      }
      group[field.name] = [null, validators];
    });

    this.form = this.fb.group(group);
  }

  loadFormData(): void {
    try {
      const dataStream = this.formType === 'A' 
        ? this.formDataService.getFormDataA() 
        : this.formDataService.getFormDataB();
      
      dataStream.subscribe((data: any) => {
        if (data) {
          this.form.setValue(data);
        }
      });
    } catch (error) {
      this.errorMessage.set('Error loading form data');
      console.error('Error loading form data:', error);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      try {
        if (this.formType === 'A') {
          this.formDataService.setFormDataA(this.form.value);
        } else {
          this.formDataService.setFormDataB(this.form.value);
        }
        
        this.successMessage.set('Form submitted successfully!');
        console.log('Form Submitted: ', this.form.value);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage.set('');
        }, 3000);
      } catch (error) {
        this.errorMessage.set('Error saving form data');
        console.error('Error saving form data:', error);
      } finally {
        this.isLoading.set(false);
      }
    } else {
      this.errorMessage.set('Please fill in all required fields correctly');
      // Mark all fields as touched to show validation errors
      this.form.markAllAsTouched();
    }
  }

  onReset(): void {
    this.form.reset();
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  togglePasswordVisibility(fieldName: string): void {
    const currentVisibility = this.passwordVisibility();
    this.passwordVisibility.set({
      ...currentVisibility,
      [fieldName]: !currentVisibility[fieldName]
    });
  }

  isPasswordVisible(fieldName: string): boolean {
    return this.passwordVisibility()[fieldName] || false;
  }
}
