import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ToggleComponent } from './toggle/toggle.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todoapp';
  checked: boolean = false;
  @ViewChild('toggleComp2') toggleComp!: ToggleComponent;
  @ViewChild('textContainer') textContainer!: ElementRef<HTMLDivElement>;
  @ViewChildren(ToggleComponent) toggles!: QueryList<ToggleComponent>;

  ngAfterViewInit() {
    console.log(this.toggles);
  }

  doSomething() {
    this.checked = !this.checked;
    console.log(this.checked);
  }

  toggleInside() {
    this.toggleComp.toggle();
  }

  setDivText() {
    if (this.textContainer.nativeElement.textContent === 'New') {
      this.textContainer.nativeElement.textContent = 'Old';
    } else {
      this.textContainer.nativeElement.textContent = 'New';
    }
  }
}
