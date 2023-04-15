import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appTitle'
})
export class AppTitlePipe implements PipeTransform {

  transform(resourceId: string,
    addText: string = 'Add',
    editText: string = 'Edit'
  ): string {
    return resourceId ? editText : addText;
  }

}
