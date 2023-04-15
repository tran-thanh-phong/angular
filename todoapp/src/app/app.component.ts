import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ToggleComponent } from './toggle/toggle.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'todoapp';
  checked: boolean = false;
  @ViewChild('toggleComp2', {static: true}) toggleComp!: ToggleComponent;
  @ViewChild('toggleComp2', {static: true, read: ElementRef}) toggleCompHtml!: ElementRef<HTMLElement>;
  @ViewChild('textContainer') textContainer?: ElementRef<HTMLDivElement>;
  @ViewChildren(ToggleComponent) toggles?: QueryList<ToggleComponent>;

  questions = {
    question1: false,
    question2: false
  }

  config = {
    main: false,
    tabGroup: false,
    welcome: true
  }

  loginText: any;
  signUpText: any;

  constructor() {
    console.log('constructor - toggleComp', this.toggleComp);
  }

  ngOnInit(): void {
    console.log('ngOnInit - toggleComp', this.toggleComp);
    console.log('ngOnInit - toggleCompHtml', this.toggleCompHtml);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit - toggleComp', this.toggleComp);
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
    if (this.textContainer?.nativeElement.textContent === 'New') {
      this.textContainer.nativeElement.textContent = 'Old';
    } else {
      this.textContainer?.nativeElement && (this.textContainer.nativeElement.textContent = 'New');
    }
  }

  checkChanges($event: any) {
    console.log('checkChanges', $event);
  }

  signUp() {
    console.log('signUp');
  }
  login() {
    console.log('login');
  }
}
