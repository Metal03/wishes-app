import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { List } from 'src/app/models/list.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild(IonList) iList: IonList;
  @Input() finished: boolean = true;
  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {}
  
  

  selectedList(item: List) {
    if ( this.finished ) {
      this.router.navigateByUrl(`/tabs/tab2/add/${ item.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${ item.id }`);
    }
  }

  async editList(item: List) {
    const alert = await this.alertCtrl.create({
      header: 'Edit list',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: item.title,
          placeholder: 'Name of lists'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel')
            this.iList.closeSlidingItems();
          }
        },
        {
          text: 'Update',
          handler: (data) => {
            if ( data.title.length === 0) {
              return;
            }
            // Edit list
            item.title = data.title;
            const id = this.deseosService.updateList(item);
            this.iList.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }

  deleteList(item: List) {
    this.deseosService.deleteList(item);
  }
}
