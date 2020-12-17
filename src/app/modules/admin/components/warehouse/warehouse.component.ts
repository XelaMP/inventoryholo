import { Component, OnInit } from '@angular/core';
import {ComponentAbstract} from '../../../../api/component';
import {Warehouse} from '../../../../interfaces/warehouse';
import {WarehouseService} from '../../../../services/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent extends ComponentAbstract implements OnInit {

  case = 'Nuevo';
  title = 'Almacen';
  item: Warehouse;

  constructor(public ws: WarehouseService) {
    super(ws);
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
