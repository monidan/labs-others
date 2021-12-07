import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('name error should be hidden on filled input', () => {
    component.signUpForm.controls.name.setValue('jack');
    fixture.detectChanges();

    const nameBlock = fixture.nativeElement.querySelector('label[for="name"]');
    expect(nameBlock.querySelector('p')).toBeNull();
  })

  it('surname error should be hidden on filled input', () => {
    component.signUpForm.controls.surname.setValue('harlow');
    fixture.detectChanges();

    const surnameBlock = fixture.nativeElement.querySelector('label[for="surname"]');
    expect(surnameBlock.querySelector('p')).toBeNull();
  })

  it('address error should be hidden on correctly filled input', () => {
    component.signUpForm.controls.address.setValue('new york 17th street');
    fixture.detectChanges();

    const addressBlock = fixture.nativeElement.querySelector('label[for="address"]');
    expect(addressBlock.querySelector('p')).toBeNull();
  })

  it('password error should be hidden on correct same password and password confirmation values', () => {
    component.signUpForm.controls.password.setValue('123456');
    component.signUpForm.controls.passwordConfirmation.setValue('123456');
    fixture.detectChanges();

    const passwordBlock = fixture.nativeElement.querySelector('label[for="passwordConfirmation"]');
    expect(passwordBlock.querySelector('p')).toBeNull();
  })

  it('show error if passwords do not match', () => {
    component.signUpForm.controls.password.setValue('123456');
    component.signUpForm.controls.passwordConfirmation.setValue('1234567');
    fixture.detectChanges();

    const passwordBlock = fixture.nativeElement.querySelector('label[for="passwordConfirmation"]');
    expect(passwordBlock.querySelector('p')).toBeTruthy();
  })

  it('when form is invalid error should appear', () => {
    const submitButton = fixture.nativeElement.querySelector('input[type="submit"]');
    const click = new MouseEvent('click');

    submitButton.dispatchEvent(click);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.form-error')).toBeTruthy();
  })

  it('when one of ads radiobuttons chosen error should be hidden', () => {
    component.signUpForm.controls.ads.setValue('Да');
    fixture.detectChanges();

    expect(
        fixture.nativeElement
          .querySelector('.ads')
          .querySelector('.error')
      ).toBeNull();
  })

  it('when one of weather forecast radiobuttons chosen error should be hidden', () => {
    component.signUpForm.controls.weatherForecast.setValue('Да');
    fixture.detectChanges();

    expect(
        fixture.nativeElement
          .querySelector('.weather-forecast')
          .querySelector('.error')
      ).toBeNull();
  })

  it('successfull form sending causing text to appear beneath', () => {
    const submitButton = fixture.nativeElement.querySelector('input[type="submit"]');
    const click = new MouseEvent('click');

    component.signUpForm.controls.name.setValue('Jack');
    component.signUpForm.controls.surname.setValue('Harlow');
    component.signUpForm.controls.address.setValue('New York 17th Street');
    component.signUpForm.controls.password.setValue('password');
    component.signUpForm.controls.passwordConfirmation.setValue('password');
    component.signUpForm.controls.ads.setValue('Да');
    component.signUpForm.controls.weatherForecast.setValue('Да');

    submitButton.dispatchEvent(click);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.form-sent--success')).toBeTruthy();
  })

  it('name input loaded', () => {
    expect(fixture.nativeElement.querySelector('#name')).toBeTruthy();
  })

  it('surname input loaded', () => {
    expect(fixture.nativeElement.querySelector('#surname')).toBeTruthy();
  })

  it('address input loaded', () => {
    expect(fixture.nativeElement.querySelector('#address')).toBeTruthy();
  })

  it('password input loaded', () => {
    expect(fixture.nativeElement.querySelector('#password')).toBeTruthy();
  })

  it('password confirmation input loaded', () => {
    expect(fixture.nativeElement.querySelector('#passwordConfirmation')).toBeTruthy();
  })

  it('radio buttons were loaded', () => {
    fixture.nativeElement.querySelectorAll('input[type="radio"]')
      .forEach((radio: Element) => {
        expect(radio).toBeTruthy();
      })
  })

  it('name error should be displayed with empty input', () => {
    component.signUpForm.controls.name.setValue('');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('label[for="name"]').querySelector('p')).toBeTruthy();
  })

  it('surname error should be displayed with empty input', () => {
    component.signUpForm.controls.surname.setValue('');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('label[for="surname"]').querySelector('p')).toBeTruthy();
  })

  it('address error should be displayed with empty input', () => {
    component.signUpForm.controls.address.setValue('');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('label[for="address"]').querySelector('p')).toBeTruthy();
  })
});
