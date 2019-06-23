import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the ImagePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'imagePipe',
})
export class ImagePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */

  constructor(private domSanitizer: DomSanitizer) {
    
  }

  transform(value: string) {
    return this.domSanitizer.bypassSecurityTrustUrl((<any>window).Ionic.normalizeURL(value));  }
}
