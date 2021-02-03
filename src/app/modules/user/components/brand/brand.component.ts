import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComponentAbstract} from '../../../../api/component';
import {Brand} from '../../../../interfaces/brand';
import {NotifierService} from 'angular-notifier';
import {BrandService} from '../../../../services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent  extends ComponentAbstract implements OnInit, OnDestroy {

  case = 'Nueva';
  title = 'Marca';
  item: Brand;

  constructor(public bs: BrandService, private ns: NotifierService) {
    super(bs, ns);
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  edit(item: any): void {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
  }

  sendForm(): void {
    this.addItem(this.item);
  }

  resetItem(): void {
    this.item = {
      name: '',
    };
  }


}
