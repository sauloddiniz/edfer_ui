import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstUpLeftOverDown'
})
export class FirstUpLeftOverDownPipe implements PipeTransform {

  transform(value: string, args?: any): any {
      if (value !== null && value !== undefined) {
          return value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase();
      }
      return value;
  }

}
