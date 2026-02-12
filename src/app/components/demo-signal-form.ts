import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'signal-form-demo',
  template: `
    <div class="mx-auto max-w-md">
      <h2 class="text-2xl font-semibold mb-5">PrimeNG Signal Form Demo</h2>
      <form
        (submit)="handleSubmit($event)"
        class="flex flex-col gap-4 text-sm"
        id="primengDemo"
        novalidate
      >
        <div class="flex flex-col gap-1">
          <label for="amount" class="font-medium">Amount</label>
          <!-- remove $any to see error -->
          <p-inputNumber
            id="amount"
            name="amount"
            autocomplete="off"
            [formField]="$any(form.amountPerToken)"
            [invalid]="form.amountPerToken().touched() && form.amountPerToken().invalid()"
            mode="decimal"
            [minFractionDigits]="0"
            [maxFractionDigits]="6"
            placeholder="Enter Amount"
            locale="en-US"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="openDate" class="font-medium">Open Date</label>
          <div>
            <p-datepicker
              [formField]="$any(form.openingDate)"
              fluid=""
              [invalid]="form.openingDate().touched() && form.openingDate().invalid()"
              name="openDate"
              [minDate]="minDate"
              appendTo="body"
              class="w-full"
              placeholder="mm/dd/yy"
              required
            />
            @if (form.openingDate().invalid() && form.openingDate().touched()) {
              <div class="app-error">
                @for (error of form.openingDate().errors(); track error) {
                  {{ error.message }}
                }
              </div>
            }
          </div>
        </div>
        <p-button label="Submit" type="submit" />
      </form>
    </div>
  `,
  imports: [ButtonModule, DatePickerModule, InputNumberModule, FormField],
})
export class SignalFormDemo {
  fields = signal<{
    amountPerToken: number | null;
    openingDate: Date | null;
  }>({
    amountPerToken: null,
    openingDate: null,
  });

  form = form(this.fields, (schemaPath) => {
    required(schemaPath.openingDate, { message: 'Opening date is required.' });
  });

  minDate = new Date();

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    console.log('in submit', this.form().value());
  }
}
