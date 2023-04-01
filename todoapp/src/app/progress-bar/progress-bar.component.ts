import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input() backgroundColor: string = '';
  @Input() progressColor: string = '';
  @Input() progress: number = 0;

  private $progess2: number = 0;

  @Input() get progress2(): number {
    return this.$progess2;

  }

  set progress2(value: number) {
    let progress = value;
    if (progress < 0) {
      progress = 0;
    } else if (progress > 100) {
      progress = 100;
    }

    this.$progess2 = progress;
  }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if ('progress' in changes) {
      if (typeof(changes['progress'].currentValue) !== 'number') {
        const progress = Number(changes['progress'].currentValue);
        if (Number.isNaN(progress)) {
          changes['progress'].currentValue = 0;
        } else {
          changes['progress'].currentValue = progress;
        }
      }
    }
  }
  constructor() {}
}
