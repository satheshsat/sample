import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormData {
  private formDataA = new BehaviorSubject<any>(this.loadFormData('formA'));
  private formDataB = new BehaviorSubject<any>(this.loadFormData('formB'));

  getFormDataA() {
    return this.formDataA.asObservable();
  }

  getFormDataB() {
    return this.formDataB.asObservable();
  }

  setFormDataA(data: any) {
    try {
      this.formDataA.next(data);
      this.saveFormData('formA', data);
    } catch (error) {
      console.error('Error setting Form A data:', error);
      throw error;
    }
  }

  setFormDataB(data: any) {
    try {
      this.formDataB.next(data);
      this.saveFormData('formB', data);
    } catch (error) {
      console.error('Error setting Form B data:', error);
      throw error;
    }
  }

  private saveFormData(key: string, data: any): void {
    try {
      if (typeof Storage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
      } else {
        console.warn('localStorage is not available');
      }
    } catch (error) {
      console.error('Error saving form data to localStorage:', error);
      throw new Error('Failed to save form data. Please try again.');
    }
  }

  private loadFormData(key: string): any {
    try {
      if (typeof Storage !== 'undefined') {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } else {
        console.warn('localStorage is not available');
        return null;
      }
    } catch (error) {
      console.error('Error loading form data from localStorage:', error);
      return null;
    }
  }

  // Clear all form data
  clearAllData(): void {
    try {
      if (typeof Storage !== 'undefined') {
        localStorage.removeItem('formA');
        localStorage.removeItem('formB');
        this.formDataA.next(null);
        this.formDataB.next(null);
      }
    } catch (error) {
      console.error('Error clearing form data:', error);
      throw error;
    }
  }

  // Check if localStorage is available
  isLocalStorageAvailable(): boolean {
    try {
      return typeof Storage !== 'undefined';
    } catch (error) {
      return false;
    }
  }
}

