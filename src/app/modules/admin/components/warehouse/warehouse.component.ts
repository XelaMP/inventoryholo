import { Component, OnInit } from '@angular/core';
import {ComponentAbstract} from '../../../../api/component';
import {Warehouse} from '../../../../interfaces/warehouse';
import {WarehouseService} from '../../../../services/warehouse.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent extends ComponentAbstract implements OnInit {

  case = 'Nuevo';
  title = 'Almacen';
  item: Warehouse;

  constructor(public ws: WarehouseService, private nt: NotifierService) {
    super(ws, nt);
  }

  ngOnInit(): void {
  }
  edit(item: any): void {
      this.case = 'Editar';
      this.idEdit = item._id;
      this.item = Object.assign({}, item);
  }

  sendForm(): void {
    this.item.state = this.item.state.toString() === 'true';
    this.addItem(this.item);
  }

  resetItem(): void{
    this.item = {
      name: '',
      address: '',
      state: true
    };
  }


}
