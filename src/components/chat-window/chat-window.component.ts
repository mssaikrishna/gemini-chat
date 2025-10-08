import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ChatWindowComponent {
  messages: { sender: string; text: string }[] = [];
  userInput = '';
  loading = false;
  
  availableModels = [
    { name: 'gemini-2.0-flash', displayName: '🚀 Gemini 2.0 Flash (Fast & Efficient)' },
    { name: 'gemini-2.0-flash-001', displayName: '🛡️ Gemini 2.0 Flash Stable' },
    { name: 'gemini-2.5-flash', displayName: '💭 Gemini 2.5 Flash (With Thinking)' },
    { name: 'gemini-2.5-pro', displayName: '🎯 Gemini 2.5 Pro (Advanced Reasoning)' }
  ];
  
  selectedModel = this.availableModels[0].name;

  constructor(private chatService: ChatService) {}

  sendMessage() {
    const message = this.userInput.trim();
    if (!message) return;

    this.messages.push({ sender: 'You', text: message });
    this.userInput = '';
    this.loading = true;

    this.chatService.sendMessage(message).subscribe({
      next: (response) => {
        const reply = response?.candidates?.[0]?.content?.parts?.[0]?.text || 
                     'I apologize, but I could not generate a response. Please try again.';
        
        this.messages.push({ 
          sender: `Gemini (${this.getModelDisplayName()})`, 
          text: reply 
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.messages.push({
          sender: 'Error',
          text: `Service temporarily unavailable. Please try again in a moment.`
        });
        this.loading = false;
      }
    });
  }

  getModelDisplayName(): string {
    const model = this.availableModels.find(m => m.name === this.selectedModel);
    return model ? model.displayName.replace(/[🚀🛡️💭🎯]/g, '').trim() : this.selectedModel;
  }

  onModelChange() {
    this.messages.push({
      sender: 'System',
      text: `Switched to ${this.getModelDisplayName()} model`
    });
  }
}