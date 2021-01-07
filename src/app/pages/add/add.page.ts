import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list.model';
import { ListItem } from '../../models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  public list: List;
  public nameItem: string = '';
  public id: string = '';
  constructor(
    private deseosService: DeseosService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = activatedRoute.snapshot.paramMap.get('id');
    
  }
  
  async ngOnInit() {
    this.list = await this.deseosService.getItem(this.id);
  }

  onChange() {
    const slopes = this.list.items.filter(item => item.completed === false);
    if (slopes.length === 0) {
      this.list.finishEn = new Date();
      this.list.finished = true;
    } else {
      this.list.finishEn = null;
      this.list.finished = false;
    }
    this.update();
  }

  addItem() {
    if(this.nameItem.length === 0) {
      return;
    }

    const newItem = new ListItem( this.nameItem );
    this.list.items.push( newItem );

    this.nameItem = '';
    this.update();
  }

  delete(i: number) {
    this.list.items.splice(i, 1);
    this.update();
  }

  update() {
    this.deseosService.updateList(this.list);
  }

}
