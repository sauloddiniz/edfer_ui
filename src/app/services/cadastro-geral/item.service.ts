import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EDFER_LOG_API } from 'src/app/domain';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    constructor(private http: HttpClient) { }

    public getItems() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/item`);
    }

    public salvarItem(item: any) {
        return this.http.post(`${EDFER_LOG_API}/item`, item);
    }

    public getItemById(idItem: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/item/${idItem}`);
    }

    public deleteItem(idItem: number) {
        console.log(idItem);
        return this.http.delete(`${EDFER_LOG_API}/item/${idItem}`);
    }

}
