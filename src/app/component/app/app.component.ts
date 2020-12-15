import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.register();
  }

}
