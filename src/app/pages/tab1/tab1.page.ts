import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { List } from '../../models/list.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public lists: List[]=[];
  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async addList() {
    const alert = await this.alertCtrl.create({
      header: 'New list',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Name of lists'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel')
          }
        },
        {
          text: 'Create',
          handler: (data) => {
            if ( data.title.length === 0) {
              return;
            }
            // Create list
            const id = this.deseosService.createList(data.title);

            this.router.navigateByUrl(`/tabs/tab1/add/${ id }`);
          }
        }
      ]
    });

    alert.present();
  }


}
