import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComponentAbstract} from '../../../../api/component';
import {Measure} from '../../../../interfaces/measure';
import {NotifierService} from 'angular-notifier';
import {MeasureService} from '../../../../services/measure.service';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css']
})
export class MeasureComponent extends ComponentAbstract implements OnInit, OnDestroy {

  case = 'Nueva';
  title = 'Medida';
  item: Measure;
  constructor(public ms: MeasureService, private ns: NotifierService) {
    super(ms, ns);
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
