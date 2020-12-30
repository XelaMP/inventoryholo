import {Service} from './service';
import {Subscription} from 'rxjs';
import {NotifierService} from 'angular-notifier';

declare var $: any;

export abstract class ComponentAbstract {
  idEdit: string;
  idDelete: string;
  subscription = new Subscription();

  protected constructor(public service: Service, private nts: NotifierService) {
    this.getItems();
    this.clean();
  }

  getItems(): void {
    this.subscription.add(this.service.getItems().subscribe());
  }

  addItem(item: any): void {
    $('#form-user').modal('hide');
    if (this.idEdit !== '') {
      this.service.updateItem(item).subscribe((res) => {
        // const response = JSON.stringify(res);
        this.nts.notify('success', 'Actualizando...');
        this.getItems();
      }, error => {
        console.log(error);
      })
    } else {
      this.service.createItem(item).subscribe((res) => {
        const response = JSON.stringify(res);
        this.nts.notify('success', 'Creando...');
        this.getItems();
      });
    }
    this.clean();
  }

  deleteItem(): void {
    this.subscription.add(this.service.deleteItem(this.idDelete).subscribe((res) => {
      const response = JSON.stringify(res);
      this.nts.notify('error', 'Eliminando...');
      this.getItems();
      this.clean();
    }));
  }

  abstract edit(item: any): void;

  clean(): void {
    this.idEdit = '';
    this.idDelete = '';
    this.resetItem();
  }

  abstract resetItem(): void;

  getKeyForDelete(key: number): void {
    console.log(this.idDelete);
    this.idDelete = key.toString();

  }

  abstract sendForm(): void;

}
