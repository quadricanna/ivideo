import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Http } from '@angular/http';

/**
 * Generated class for the YoutubePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'youtube',
})
export class YoutubePipe implements PipeTransform {

  constructor(private http: Http, private domSanitizer: DomSanitizer) {
    
  }
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+value+"?fs=0&rel=0&showinfo=0&controls=0&autoplay=0");
  }

}
