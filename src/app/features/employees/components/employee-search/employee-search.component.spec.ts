import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSearchComponent } from './employee-search.component';

describe('EmployeeSearchComponent', () => {
  let component: EmployeeSearchComponent;
  let fixture: ComponentFixture<EmployeeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSearchComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeSearchComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event with employee ID', () => {
    spyOn(component.search, 'emit');

    component.searchId = '123';
    component.onSearch();

    expect(component.search.emit).toHaveBeenCalledWith('123');
  });

  it('should not emit search when ID is empty', () => {
    spyOn(component.search, 'emit');

    component.searchId = '';
    component.onSearch();

    expect(component.search.emit).not.toHaveBeenCalled();
  });

  it('should trim spaces before searching', () => {
    spyOn(component.search, 'emit');

    component.searchId = ' 123 ';
    component.onSearch();

    expect(component.search.emit).toHaveBeenCalledWith('123');
  });

  it('should emit clear event when clear is called', () => {
    spyOn(component.clear, 'emit');

    component.searchId = '123';
    component.onClear();

    expect(component.clear.emit).toHaveBeenCalled();
    expect(component.searchId).toBe('');
  });
});