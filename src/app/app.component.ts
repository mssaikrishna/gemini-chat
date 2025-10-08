import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatWindowComponent } from '../components/chat-window/chat-window.component';  

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-gemini-chat';
}
  