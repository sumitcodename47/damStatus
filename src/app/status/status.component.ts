import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  dataBhima: any[] = [];
  dataKrishna: any[] = [];

  displayedColumns: string[] = [
    'name',
    'totalStorage',
    'currentStorage',
    'percentage',
  ];
  dataSource = [];
  date = new FormControl(new Date());
  selectedDate = new Date();
  selectedBasin: any = 'dataKrishna';

  constructor(private http: HttpClient) {
    this.http.get('assets/dataBhima.json').subscribe((data: any) => {
      this.dataBhima = data.Bhima;
    });

    this.http.get('assets/dataKrishna.json').subscribe((data: any) => {
      this.dataKrishna = data.Krishna;
      this.changeData(this.selectedDate, this.dataKrishna);
    });
  }

  ngOnInit(): void {}
  onBasinChange(event: any) {
    this.selectedBasin = event.value;
    console.log(this.selectedBasin);
    this.changeData(this.selectedDate, this[this.selectedBasin]);
  }

  dateChnaged(event: any) {
    console.log(event.value);
    this.selectedDate = event.value;
    this.changeData(this.selectedDate, this[this.selectedBasin]);
  }

  changeData(date, data) {
    const parsedDate =
      date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    this.dataSource = this.objectToArray(data[parsedDate]);
  }
  // function to change object to array
  objectToArray(obj) {
    const arr = [];
    // no data for selected date
    if (!obj) {
      return;
    }
    Object.keys(obj).forEach((key) => {
      const tempObj = {
        name: '',
        totalStorage: '',
        currentStorage: '',
        percentage: '',
      };
      tempObj.name = key;
      tempObj.totalStorage = obj[key].totalStorage;
      tempObj.currentStorage = obj[key].currentStorage;
      tempObj.percentage = obj[key].percentage;
      arr.push(tempObj);
    });
    return arr;
  }
}
