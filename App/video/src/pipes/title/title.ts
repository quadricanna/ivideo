import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TitlePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'titlePipe',
})
export class TitlePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.replace(".mp4", "");
  }
}
