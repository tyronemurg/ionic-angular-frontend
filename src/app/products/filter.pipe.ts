import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, filterGroup: any): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    return _.filter(items, it => this.filterByOr(it, filterGroup, searchText));
  }

  filterByOr(item: any, filterGroup: any, searchText: string) {
    let flag = false;
    for (let key of filterGroup) {
      console.log(key, typeof item[key]);
      switch (typeof item[key]) {
        case 'string': flag = this.filterByString(item, key, searchText);
          break;
        case 'number': flag = this.filterByNumber(item, key, searchText);
          break;

      }
      if (flag) { break; }
    }
    return flag;
  }

  filterByString(item, key, searchText) {
    searchText = searchText.toLowerCase();
    return item[key].toLowerCase().includes(searchText);
  }

  filterByNumber(item, key, searchText) {
    return item[key] === Number.parseFloat(searchText);
  }

  filterByBoolean(item, key, searchText) {
    return item[key] === (/true/i).test(searchText);
  }

}
