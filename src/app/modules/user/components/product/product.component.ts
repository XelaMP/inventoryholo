import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ComponentAbstract} from '../../../../api/component';
import {Product, ProductX} from '../../../../interfaces/product';
import {Category} from '../../../../interfaces/category';
import {ProductService} from '../../../../services/product.service';
import {NotifierService} from 'angular-notifier';
import {CategoryService} from '../../../../services/category.service';
import {User} from '../../../../interfaces/user';
import {UserService} from '../../../../services/user.service';
import {Store} from '@ngrx/store';
import {SEARCH} from '../../../../store/search/search.reducer';
import {Measure} from '../../../../interfaces/measure';
import {Movement} from '../../../../interfaces/movement';
import {MeasureService} from '../../../../services/measure.service';
import {MovementService} from '../../../../services/movement.service';
import {Filter} from '../../../../interfaces/filter';
import {Utils} from '../../../../shared/utils';
import {ExcelService} from '../../../../services/excel.service';
import {ProductWarehouse} from '../../../../interfaces/productwarehouse';
import {ProductWarehouseService} from '../../../../services/product-warehouse.service';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends ComponentAbstract implements OnInit, OnDestroy {

  case = 'Nuevo';
  title = 'Producto';
  item: Product;
  idWarehouse: number;
  idproduct = 0;
  products: Product[] = [];
  productId = 'all';
  categories: Category[] = [];
  measures: Measure[] = [];
  lots: Movement[] = [];
  brands: Movement[] = [];
  private user: User;
  filter = 'all';
  temp = [];
  aux = [];
  productName = '';
  categoryID = 'all';
  searchText = 'all';

  searchTemp = '';
  warehouseID: string;
  check: boolean;


  constructor(public ps: ProductService, private nt: NotifierService, private cs: CategoryService, private us: UserService,
              private store: Store<any>, private ms: MeasureService, private xs: ExcelService,
              private   mvs: MovementService, private pws: ProductWarehouseService) {
    super(ps, nt);
    this.subscription.add(store.select(SEARCH).subscribe(data => {
      let text = 'all';
      if (data !== '') {
        text = data;
      }
      this.search(text);
    }));
  }


  ngOnInit(): void {
    this.getCategories();
    this.getUser();
    this.getMeasures();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  search(val: string): void {
    this.filter = 'all';
    this.products = this.temp;
    if (val !== 'all') {
      this.products = this.products.filter(data => data.name.toLowerCase().indexOf(val) !== -1 || !val);
    }
  }

  filterCategory(val: string): void { // me tarde en sabr que era eso
    this.products = this.temp;
    if (this.filter !== 'all') {
      this.products = this.products.filter(data => data.idCategory.toString() === this.filter);
    }
  }

  getItems(): void {
    if (this.user) {
      this.getProductNoIgnore();
    }
  }

  getProductsStock(idWarehouse: number): void {
    this.ps.getItemsAllId(idWarehouse.toString()).subscribe(() => {
      this.products = this.ps.items;
      this.products = this.products.sort((a, b) => a.stock > b.stock ? 1 : -1);
      this.temp = this.products;

    });
  }

  getProductNoIgnore(): void {
    this.subscription.add(this.ps.getAllNoIgnore(this.user.idWarehouse.toString()).subscribe(() => {
      this.products = this.ps.items;
      this.temp = this.products;
    }));
  }

  getProductsCategory(idCategory: string): void {
    this.subscription.add(this.ps.getItemsAllIdCategory(idCategory).subscribe(() => {
      this.products = this.ps.items;
    }));
  }

  getProductAllNew(): void {

    this.subscription.add(this.ps.getAllNew(this.user.idWarehouse).subscribe(() => {
      this.products = this.ps.items;
      this.temp = this.products;
    }));
  }

  private getUser(): void {
    const id = sessionStorage.getItem('_id');
    this.subscription.add(this.us.getItem(id).subscribe(() => {
      this.user = this.us.item;
      this.idWarehouse = this.user.idWarehouse;
      this.getProductNoIgnore();
    }));
  }

  private getCategories(): void {
    this.subscription.add(this.cs.getItems().subscribe(() => {
      this.categories = this.cs.items;
    }));
  }

  private getMeasures(): void {
    this.subscription.add(this.ms.getItems().subscribe(() => {
      this.measures = this.ms.items;
    }));
  }

  getLots(idProduct: number): void {
    const product = this.products.find(e => e._id === idProduct);
    this.productName = product.name;
    const filter: Filter = {
      _id: idProduct.toString(),
      auxId: this.idWarehouse.toString()
    };
    this.mvs.getItemsAllLotsWarehouse(filter).subscribe(() => {
      this.lots = this.mvs.items;
      this.lots.forEach((e, i) => {
        this.lots[i].dayDue = Utils.dueDateCompare(e.dueDate);
      });
      this.lots = this.lots.sort((a, b) => new Date(a.dueDate) > new Date(b.dueDate) ? 1 : -1);
    });
  }

  getBrands(idProduct: number): void {
    const filter: Filter = {
      _id: idProduct.toString(),
      auxId: this.idWarehouse.toString()
    };
    this.mvs.getItemsAllBrandsWarehouse(filter).subscribe(() => {
      this.brands = this.mvs.items;
    });
  }

  closeLots(): void {
    $('#form-lot').modal('hide');
  }

  closeBrands(): void {
    $('#form-brand').modal('hide');
  }

  edit(item: any): void {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);

  }

  sendForm(): void {
    const n = this.item.idCategory.toString();
    this.item.idCategory = +n;
    const n2 = this.item.idMeasure.toString();
    this.item.idMeasure = +n2;
    this.addItem(this.item);
  }

  resetItem(): void {
    this.item = {
      name: '',
      description: '',
      idCategory: 0,
      price: 0,
      stock: 0,
      perishable: false,
      ignore: false
    };
  }

  downloadXLS(): void {
    const worksheet: ProductX[] = [];

    for (const x1 of this.products) {
      const no: ProductX = {
        Nombre: x1.name,
        Descripción: x1.description,
        Precio: x1.price,
        Stock: x1.stock,
        Medida: x1.measure,
        Unidades: x1.unity * x1.stock
      };
      worksheet.push(no);
    }
    const fileName = 'Productos';
    this.xs.exportAsExcelFile(worksheet, fileName);
  }

  changeCategory(): void {
    this.products = [];
    this.productId = 'all';
    if (this.categoryID !== 'all') {
      this.getProductsCategory(this.categoryID);
    }
    this.updateFilter();
  }

  updateFilter(): void {
    this.products = this.aux;
    const val = this.filter;
    const idCat = this.categoryID === 'all' ? '' : this.categoryID;
    this.products = this.products.filter(data => idCat === '' ? true : data.idCategory.toString() === idCat);
    console.log(this.products);
  }

  changeStatusProduct(idProduct: number, ignore: boolean): void {
    const item: ProductWarehouse = {
      idProduct,
      idWarehouse: this.user.idWarehouse,
      ignore
    };
    this.pws.changeStatus(item).subscribe((res) => {
      this.subscription.add(this.ps.getAllNew(this.user.idWarehouse).subscribe(() => {
        this.subscription.add(this.ps.getAllNoIgnore(this.user.idWarehouse.toString()).subscribe(() => {
          this.changeIgnore();
          this.products = this.ps.items;
          this.temp = this.products;
        }));
      }));

      console.log(res);
    });
  }

  changeIgnore(): void {
    if (this.check === true) {
      this.getProductAllNew();
    } else {
      this.getProductNoIgnore();
    }
  }
}

