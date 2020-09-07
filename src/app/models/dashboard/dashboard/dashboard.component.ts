import { Component, OnInit } from '@angular/core';
import { SharedService, LoginService } from 'src/app/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    shared: any;

  constructor() {
  }

  ngOnInit() {
  }
}
