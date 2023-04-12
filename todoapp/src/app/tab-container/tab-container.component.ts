import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss']
})
export class TabContainerComponent implements OnInit {
  @Input() headerTemplate!: TemplateRef<any>;
  @Input() defaultTabButtons!: TemplateRef<any>;

  ngOnInit(): void {

  }
}
