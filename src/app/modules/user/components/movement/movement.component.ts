import {Component, OnInit} from '@angular/core';
import {ComponentAbstract} from '../../../../api/component';
import {Movement} from '../../../../interfaces/movement';
import {User} from '../../../../interfaces/user';
import {Product} from '../../../../interfaces/product';
import {Client} from '../../../../interfaces/client';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MovementService} from '../../../../services/movement.service';
import {NotifierService} from 'angular-notifier';
import {ProductService} from '../../../../services/product.service';
import {ClientService} from '../../../../services/client.service';
import {UserService} from '../../../../services/user.service';
import {Utils} from '../../../../shared/utils';
import {Filter} from '../../../../interfaces/filter';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent extends ComponentAbstract implements OnInit {

  type: string = '';
  from: string;
  to: string;

  case = 'Nueva';
  item: Movement;
  user: User;
  products: Product[] = [];
  clients: Client[] = [];
  movements: Movement[] = [];

  constructor(private route: ActivatedRoute, private router: Router, public ms: MovementService,
              private nt: NotifierService, private ps: ProductService, private cs: ClientService, private us: UserService) {
    super(ms, nt);
  }


  ngOnInit(): void {
    this.init();
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  getItems(): void {
    if (this.user) {
      this.getItemsFilter();
    }
  }

  private getItemsFilter(): void{
    const filter: Filter = {
      _id: this.user.idWarehouse.toString(),
      type: this.type,
      dateFrom: this.from,
      dateTo: this.to
    };
    console.log(filter);
    this.subscription.add(this.ms.getItemsFilter(filter).subscribe(() => {
      this.movements = this.ms.items;
    }));
  }

  private init(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    this.getUser();
    this.getDateToday();
    this.getProducts();
    this.getClients();
  }

  edit(item: any): void {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
    this.item.date = Utils.dateToString(new Date(this.item.date));
  }

  sendForm(): void {
    const n = this.item.idProduct.toString();
    this.item.idProduct = +n;
    const c = this.item.idClient.toString();
    this.item.idClient = +c;
    this.item.idUser = this.user._id;
    this.item.idWarehouse = this.user.idWarehouse;
    if (this.type === 'output') {
      if (this.item.quantity > 0) {
        this.item.quantity = -this.item.quantity;
      }
    }
    console.log(this.item);
    this.addItem(this.item);
  }

  resetItem(): void {
    this.item = {
      date: Utils.dateString(),
      idProduct: 1,
      idUser: this.user === undefined ? 1 : this.user._id,
      idWarehouse: this.user === undefined ? 1 : this.user.idWarehouse,
      quantity: 1,
      type: this.type
    };
  }

  private getDateToday(): void {
    this.from = Utils.dateString( 1);
    this.to = Utils.dateString();
  }

  private getUser(): void {
    const id = sessionStorage.getItem('_id');
    this.subscription.add(this.us.getItem(id).subscribe(() => {
      this.user = this.us.item;
      this.getItems();
    }));
  }

  private getProducts(): void {
    this.subscription.add(this.ps.getItems().subscribe(() => {
      this.products = this.ps.items;
    }));
  }

  private getClients(): void {
    this.subscription.add(this.cs.getItems().subscribe(() => {
      this.clients = this.cs.items;
    }));
  }

  updateDate(): void {
    this.getItemsFilter();
  }


}
