import { Component, EventEmitter, Output  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-employee-search',
  imports: [FormsModule, MatIconModule],
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.scss'
})
export class EmployeeSearchComponent {
  searchId = '';

  @Output() search = new EventEmitter<string>();

  @Output() clear = new EventEmitter<void>();

  // Search Employee By Id 
  onSearch(): void {
    const id = this.searchId.trim();

    if (!id) {
      return;
    }

    this.search.emit(id);
  }

  // Clear Search
  onClear(): void {
    this.searchId = '';
    this.clear.emit();
  }

  // Search Input 
  onInputChange(): void {
    if (!this.searchId.trim()) {
      this.onClear();
    }
  }
}
