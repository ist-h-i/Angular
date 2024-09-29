import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsComponent } from './forms.component';
import { FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

describe('FormsComponent', () => {
  let component: FormsComponent;
  let fixture: ComponentFixture<FormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsComponent,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a FormArray instance', () => {
    expect(component.items).toBeInstanceOf(FormArray);
  });
  
  it('should return the correct FormArray instance from myForm', () => {
    const myForm = new FormGroup({
      items: new FormArray([])
    });
    component.myForm = myForm;
    expect(component.items).toBe(myForm.get('items') as FormArray);
  });
  
  it('should initialize myForm as a FormGroup', () => {
    expect(component.myForm instanceof FormGroup).toBeTrue();
  });

  it('should initialize items as a FormArray within myForm', () => {
    expect(component.myForm.get('items') instanceof FormArray).toBeTrue();
  });

  it('should initialize items as an empty FormArray', () => {
    expect(component.items.length).toBe(0);
  });

  it('should add a new FormControl to the items FormArray', () => {
    const initialLength = component.items.length;
    component.addItem();
    expect(component.items.length).toBe(initialLength + 1);
  });

  it('should initialize the new FormControl with an empty string value', () => {
    component.addItem();
    const newControl = component.items.at(component.items.length - 1);
    expect(newControl.value).toBe('');
  });

  it('should not throw an error when called', () => {
    expect(() => component.addItem()).not.toThrow();
  });

  it('should remove an item from an empty form array', () => {
    const formArray = new FormArray([]);
    component.myForm.setControl('items', formArray);
    component.removeItem();
    expect(formArray.length).toBe(0);
  });

  it('should remove an item from a form array with one item', () => {
    const formArray = new FormArray([new FormControl('item1')]);
    component.myForm.setControl('items', formArray);
    component.removeItem();
    expect(formArray.length).toBe(0);
  });

  it('should remove an item from a form array with multiple items', () => {
    const formArray = new FormArray([new FormControl('item1'), new FormControl('item2'), new FormControl('item3')]);
    component.myForm.setControl('items', formArray);
    component.removeItem();
    expect(formArray.length).toBe(2);
    expect(formArray.at(0).value).toBe('item1');
    expect(formArray.at(1).value).toBe('item2');
  });
});
