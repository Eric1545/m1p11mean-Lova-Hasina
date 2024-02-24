import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  listeNotification: any[] = []
  loading: boolean = false;
  constructor(private notificationService: NotificationService, private router: Router, private webSocketService: SocketService, private auth: AuthService) { }
  ngOnInit(): void {
    this.auth.redirectIfNotConnect()
    // this.webSocketService.listen('rappel').subscribe(() => this.getData());
    this.getData()
    this.webSocketService.listen('notification').subscribe((data) => this.getData());
  }
  getData() {
    this.loading = true
    this.notificationService.getNotification().then((data: any) => {
      console.log(data.data.result)
      this.listeNotification = data.data.result
      this.loading = false
    }).catch((error) => {
      console.log(error)
      this.loading = false
    })
  }
  async voirDetailNotification(idNotification: string, type: string, idObjet: string) {
    console.log(type, idObjet)
    this.loading = true
    try {
      await this.notificationService.updateRead(idNotification)
      this.webSocketService.emit('notification', { idNotification: idNotification })
      this.router.navigate([`/client/detailNotification/${type}/${idObjet}`])
      this.loading = false
    } catch (error) {
      this.loading = false
    }
  }
}
