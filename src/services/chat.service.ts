import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'https://generativelanguage.googleapis.com/v1';
  
  // Use one of the available models that supports generateContent
  private availableModels = [
    'gemini-2.0-flash',           // Fast model
    'gemini-2.0-flash-001',       // Stable version
    'gemini-2.5-flash',           // Mid-size with thinking capability
    'gemini-2.5-pro'              // Pro version with thinking
  ];

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    // Use gemini-2.0-flash (fast and reliable)
    const model = this.availableModels[0];
    const url = `${this.baseUrl}/models/${model}:generateContent?key=${environment.GEMINI_API_KEY}`;
    
    const body = {
      contents: [{ 
        parts: [{ text: message }] 
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    };
    
    return this.http.post(url, body);
  }

  // Optional: Method to switch between different models
  // sendMessageWithModel(message: string, modelIndex: number = 0): Observable<any> {
  //   const model = this.availableModels[modelIndex];
  //   const url = `${this.baseUrl}/models/${model}:generateContent?key=${environment.GEMINI_API_KEY}`;
    
  //   const body = {
  //     contents: [{ 
  //       parts: [{ text: message }] 
  //     }],
  //     generationConfig: {
  //       temperature: 0.7,
  //       maxOutputTokens: 800,
  //     }
  //   };
    
  //   console.log(`Using model: ${model}`);
  //   return this.http.post(url, body);
  // }
}