import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  canDel: boolean;
  @Input() public showConfirmDelete: boolean ;
  @Output() private canDelete = new EventEmitter<void>();
  @Output() private resetLoginFormPopupStateInParent = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    console.log(this.showConfirmDelete);
  }
  public hideConfirmDeletePopup() {
    this.showConfirmDelete = false;
  }

}
