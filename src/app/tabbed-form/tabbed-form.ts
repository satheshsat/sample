import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabbed-form',
  imports: [DynamicForm, CommonModule],
  templateUrl: './tabbed-form.html',
  styleUrls: ['./tabbed-form.scss']
})
export class TabbedForm {
  activeTab: number = 0;

  // JSON schema for Form A and Form B
  schemaA = [
    { type: 'text', label: 'Full Name', name: 'fullName', required: true },
    { type: 'email', label: 'Email', name: 'email' },
    { type: 'checkbox', label: 'Subscribe', name: 'subscribe' }
  ];

  schemaB = [
    { type: 'text', label: 'Username', name: 'username', required: true },
    { type: 'password', label: 'Password', name: 'password', required: true },
    { type: 'checkbox', label: 'Remember Me', name: 'remember' }
  ];

  // Manage tab form data in a BehaviorSubject
  formDataA = new BehaviorSubject<any>(null);
  formDataB = new BehaviorSubject<any>(null);

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }
}
