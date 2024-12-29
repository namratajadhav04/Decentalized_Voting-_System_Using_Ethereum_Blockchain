// src/types/react-simple-chatbot.d.ts
declare module 'react-simple-chatbot' {
    import * as React from 'react';
  
    interface ChatBotProps {
      steps: any[];
      [key: string]: any;
    }
  
    export default class ChatBot extends React.Component<ChatBotProps> {}
  }
  