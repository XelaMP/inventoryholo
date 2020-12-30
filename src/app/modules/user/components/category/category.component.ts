import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComponentAbstract} from '../../../../api/component';
import {Category} from '../../../../interfaces/category';
import {CategoryService} from '../../../../services/category.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends ComponentAbstract implements OnInit, OnDestroy {

    case = 'Nueva';
    title = 'Categoria';
    item: Category;

  constructor(public cs: CategoryService, private nt: NotifierService) {
      super(cs, nt);
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  edit(item: any): void{
      this.case = 'Editar';
      this.edit = item._id;
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
