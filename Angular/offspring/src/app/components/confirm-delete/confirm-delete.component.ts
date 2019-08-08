import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  canDel: boolean
  @Output() canDelete

  constructor() { }

  ngOnInit() {
  }

}
