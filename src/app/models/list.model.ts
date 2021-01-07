import { ListItem } from './list-item.model';

export class List {
    id: number;
    title: string;
    createAt: Date;
    finishEn: Date;
    finished: boolean;
    items: ListItem[];

    constructor (title: string) {
        this.title = title;
        this.createAt = new Date();
        this.finished = false;
        this.items = [];

        this.id = new Date().getTime();
    }
}