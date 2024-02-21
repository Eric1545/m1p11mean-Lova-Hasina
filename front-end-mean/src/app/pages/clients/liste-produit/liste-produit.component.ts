import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.css']
})
export class ListeProduitComponent {
  title = 'Websocket Angular client ';
  userName!: string;
  message!: string;
  output: any[] = [];
  feedback!: string;

  constructor(private webSocketService: SocketService) { }
  ngOnInit(): void {
    this.webSocketService.listen('typing').subscribe((data) => this.updateFeedback(data));
    this.webSocketService.listen('rappel').subscribe((data) => this.updateMessage(data));
  }

  messageTyping(): void {
    this.webSocketService.emit('typing', this.userName);    
  }

  sendMessage(): void {
    this.webSocketService.emit('chat', {
      message: this.message,
      handle: this.userName
    });
    this.message = "";    
  }

  updateMessage(data:any) {
    // this.feedback = '';
    // if(!!!data) return;
    // console.log(`${data.handle} : ${data.message}`);
    // this.output.push(data);
    console.log('rappele')
  }

  updateFeedback(data: any){
    this.feedback = `${data} is typing a message`;
  }

}
