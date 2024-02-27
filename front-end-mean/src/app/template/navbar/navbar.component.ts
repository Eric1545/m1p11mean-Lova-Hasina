import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombreNotification:number = 0
  constructor(private notificationService: NotificationService,private webSocketService: SocketService,private auth:AuthService){}
  ngOnInit(): void {
    this.getData()
    this.webSocketService.listen('notification').subscribe((data) => this.getData());
  }
  getData(){
    this.notificationService.countNotification().then((response:any)=>{
      this.nombreNotification = response.data.result
    })
  }
  async deconnexion(){
    await this.auth.deconnexion()
  }
}
