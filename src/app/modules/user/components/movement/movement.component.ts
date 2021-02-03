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
import {Provider} from '../../../../interfaces/provider';
import {ProviderService} from '../../../../services/provider.service';
import {MovementAction} from '../../../../store/movement/movement.reducer';
import {Store} from '@ngrx/store';
import {Brand} from '../../../../interfaces/brand';
import {BrandService} from '../../../../services/brand.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent extends ComponentAbstract implements OnInit {

  type = '';
  from: string;
  to: string;
  idWarehouse: number;
  stockLot = 0;
  stockBrand = 0;
  stockBase = 0;
  lots: Movement[] = [];
  brandsOut: Movement[] = [];

  measure = 'Unidad de Medida';
  stock = 0;
  perishable = false;

  case = 'Nueva';
  item: Movement;
  user: User;
  products: Product[] = [];
  clients: Client[] = [];
  providers: Provider[] = [];
  movements: Movement[] = [];
  brands: Brand[] = [];

  constructor(private route: ActivatedRoute, private router: Router, public ms: MovementService,
              private nt: NotifierService, private ps: ProductService, private cs: ClientService,
              private us: UserService, private pds: ProviderService, private bs: BrandService, private store: Store<any>) {
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

  private getBrands(): void {
    this.subscription.add(this.bs.getItems().subscribe(() => {
      this.brands = this.bs.items;
    }));
  }

  private getBrandsProducts(idProduct: number): void {
    const filter: Filter = {
      _id: idProduct.toString(),
      auxId: this.idWarehouse.toString()
    };
    this.ms.getItemsAllBrandsWarehouse(filter).subscribe(() => {
      this.brandsOut = this.ms.items;
      if (this.item.idBrand) {
        this.changeBrand();
      }
    });
  }

  changeBrand(): void {
    const brand = this.brandsOut.find(e => e.idBrand === this.item.idBrand);
    this.stockBrand = brand.quantity;
    this.stockBase = this.stockBrand;
  }

  changeProduct(): void {
    const product = this.products.find(e => e._id.toString() === this.item.idProduct.toString());
    this.measure = product.measure;
    this.stock = product.stock;
    this.stockBase = this.stock;
    this.perishable = product.perishable;
    if (this.perishable) {
      this.getLots(product._id);
    } else {
      this.getBrandsProducts(product._id);
    }
  }

  changeLot(): void {
    const lot = this.lots.find(e => e.idLot === this.item.idLot);
    this.stockLot = lot.quantity;
    this.stockBase = this.stockLot;
    this.item.idBrand = lot.idBrand;
    this.item.brand = lot.brand;
  }

  private getItemsFilter(): void {
    const filter: Filter = {
      _id: this.user.idWarehouse.toString(),
      type: this.type,
      dateFrom: this.from,
      dateTo: this.to
    };
    // console.log(filter);
    this.subscription.add(this.ms.getItemsFilter(filter).subscribe(() => {
      this.movements = this.ms.items;
    }));
  }

  private init(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    this.getUser();
    this.getDateToday();
    this.getClients();
    this.getProviders();
    this.getBrands();
    this.perishable = false;
  }

  edit(item: any): void {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
    this.item.date = Utils.dateToString(new Date(this.item.date));
    if (this.item.perishable) {
      this.item.dueDate = Utils.dateToString(new Date(this.item.dueDate));

    }
    this.changeProduct();
  }

  movementDispatch(message: string): void {
    const action = new MovementAction(message);
    this.store.dispatch(action);
  }

  sendForm(): void {
    const n = this.item.idProduct.toString();
    this.item.idProduct = +n;
    const c = this.item.idClient.toString();
    this.item.idClient = +c;
    const p = this.item.idProvider.toString();
    this.item.idProvider = +p;
    this.item.idUser = this.user._id;
    this.item.idWarehouse = this.user.idWarehouse;
    if (this.type !== 'input' && this.item.quantity > this.stockBase) {
      this.nt.notify('error', '¡No Cuenta con Stock Disponible!');
      return;
    }
    if (this.type === 'output') {
      if (this.item.quantity > 0) {
        this.item.quantity = -this.item.quantity;
      }
    }

    this.addItem(this.item).then((r) => {
      console.log(r);
      this.movementDispatch(r + ' ' + new Date().getMilliseconds());
      this.getProducts(this.user.idWarehouse.toString());
    });
  }

  resetItem(): void {
    this.item = {
      date: Utils.dateString(),
      idProduct: 1,
      idUser: this.user === undefined ? 1 : this.user._id,
      idWarehouse: this.user === undefined ? 1 : this.user.idWarehouse,
      quantity: 1,
      type: this.type,
      idClient: 0,
      idProvider: 0,
    };
  }

  private getDateToday(): void {
    this.from = Utils.dateString(1);
    this.to = Utils.dateString();
  }

  getLots(idProduct: number): void {
    const filter: Filter = {
      _id: idProduct.toString(),
      auxId: this.idWarehouse.toString()
    };
    this.ms.getItemsAllLotsWarehouse(filter).subscribe(() => {
      this.lots = this.ms.items;
      this.lots.forEach((e, i) => {
        this.lots[i].dayDue = Utils.dueDateCompare(e.dueDate);
      });
      this.lots = this.lots.sort((e1, e2) => new Date(e1.dueDate) > new Date(e2.dueDate) ? 1 : -1);
      if (this.item.idLot) {
        this.changeLot();
      }
    });
  }

  private getUser(): void {
    const id = sessionStorage.getItem('_id');
    this.subscription.add(this.us.getItem(id).subscribe(() => {
      this.user = this.us.item;
      this.idWarehouse = this.user.idWarehouse;
      this.getItemsFilter();
      this.getProducts(this.user.idWarehouse.toString());
    }));
  }

  private getProducts(idWarehouse: string): void {
    this.subscription.add(this.ps.getItemsAllId(idWarehouse).subscribe(() => {
      this.products = this.ps.items;
    }));
  }

  private getProviders(): void {
    this.subscription.add(this.pds.getItems().subscribe(() => {
      this.providers = this.pds.items;
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
