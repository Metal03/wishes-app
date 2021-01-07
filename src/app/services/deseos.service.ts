import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { List } from '../models/list.model';

const { Storage } = Plugins;
const ITEMS_KEY = 'my-wishes';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  public lists: List[] = [];
  constructor() { 
    this.getItems();
  }


  async getItems() {
    const key = ITEMS_KEY;
    const resp = await Storage.get({key});
    if ( resp.value ) {
      this.lists = JSON.parse(resp.value);
    } else {
      this.lists = [];
    }   
  }

  async getItem(id: string | number) {
    id = Number(id);
    await this.getItems();
    return this.lists.find(item => item.id === id);
  }

  createList(title: string) {
    const newList = new List(title);
    this.lists.push(newList);
    this.saveStorage(this.lists);

    return newList.id;
  }

  async saveStorage(item: List[]): Promise<any>
  {
    const key = ITEMS_KEY;
    Storage.set({ key, value: JSON.stringify(item) });
  }

  async updateList(item: List): Promise<any>
  {
    const key = ITEMS_KEY;
    // Check if the object exists in the storage
    return Storage.get({ key }).then((items) => {
      const data: List[] = JSON.parse(items.value); // Get the response from the JSON and save it in a variable of type object
      if (!data || data.length === 0 )
      {
        return null;
      }
      const newItems: List[] = [];
      for (const i of data)
      {
        if (i.id === item.id)
        {
          newItems.push(item);
        }else{
          newItems.push(i);
        }
      }
      Storage.set({ key, value: JSON.stringify(newItems) });
    });
  }

  deleteList(item: List) {
    this.lists = this.lists.filter(list => list.id !== item.id);
    this.saveStorage(this.lists);
  }
  
}
