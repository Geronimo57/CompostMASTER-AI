/**
* (c) 2026 Joël LARSKI
* Released under the MIT License
* Part of the CompostMASTER-AI Project.
*/


export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface AnalysisResult {
  canCompost: 'yes' | 'no' | 'limited';
  reason: string;
  category: string;
  tips: string[];
}

export enum AppTab {
  IDENTIFY = 'identify',
  CHAT = 'chat',
  GUIDE = 'guide'
}
