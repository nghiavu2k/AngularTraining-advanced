import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatDate' })
export class PipeAndDirectiveComponent implements PipeTransform {
  constructor() { }
  transform(date: Date | string, format: string = 'yyyy-MM-dd'): string | null {
    date = new Date(date);
    date.setDate(date.getDate());
    return new DatePipe('en-US').transform(date, format);
  }
}
