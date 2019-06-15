import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText'
})
export class CutTextPipe implements PipeTransform {

  transform(text: any, limit: number): any {
    if (text) {
      if (text.length > limit) {
        return text.slice(0, limit) + '...';
      } else {
        return text;
      }
    }
  }

}
