import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface QuestionLog {
  timestamp: string;
  question: string;
  answer: string;
  wasHelpful: boolean | null;
}

const SYSTEM_PROMPT = `You are an AI assistant for Imran Khan's portfolio website (softwarerebel.com). Imran is a Front-End Engineer specializing in React, Vue, TypeScript, StencilJS, and Python.

Key Information:
- Name: Imran Khan
- Role: Front-End Engineer
- Core Skills: React, Vue, TypeScript, StencilJS, Python
- Current Status: Open to freelance projects for Q2 2026
- Tagline: "Let's build something extraordinary together"

Your role:
- Answer questions about Imran's skills, experience, and availability
- Be friendly, professional, and conversational
- If asked about specific projects, mention that the portfolio is being updated with case studies
- Encourage visitors to reach out for freelance opportunities
- If you don't know something specific, be honest and suggest they contact Imran directly
- Keep responses concise but informative (2-4 sentences typically)

Tone: Professional yet approachable, enthusiastic about technology and collaboration.`;

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "Hi! I'm Imran's AI assistant. I can tell you about his skills, experience, and availability. What would you like to know?"
        }
      ]);
    }
  }, [isOpen, messages.length]);

  const logQuestion = (question: string, answer: string): void => {
    const log: QuestionLog = {
      timestamp: new Date().toISOString(),
      question,
      answer,
      wasHelpful: null
    };

    console.log('Question logged:', log);

    try {
      const existingLogs = localStorage.getItem('chatLogs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      logs.push(log);
      localStorage.setItem('chatLogs', JSON.stringify(logs));
    } catch (error) {
      console.error('Failed to log question:', error);
    }
  };

  const handleSend = async (): Promise<void> => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [
            ...conversationHistory,
            { role: 'user', content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      if (data.content && data.content[0]) {
        const assistantMessage = data.content[0].text;
        setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
        logQuestion(userMessage, assistantMessage);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again or contact Imran directly through thec contact details on the website."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-primary hover:bg-primary-glow text-primary-foreground rounded-full p-4 shadow-lg transition-all hover:scale-110 flex items-center gap-3 group overflow-hidden font-inter"
          style={{
            boxShadow: '0 0 20px hsl(var(--primary) / 0.3)',
            transition: 'var(--transition-smooth)'
          }}
          aria-label="Open chat assistant"
        >
          <div
            className="absolute inset-0 bg-primary-glow opacity-0 group-hover:opacity-20 blur-2xl transition-opacity"
            style={{ transition: 'var(--transition-smooth)' }}
          />
          {/* Custom AI Chat Icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="relative z-10 group-hover:scale-110 transition-transform"
            style={{ transition: 'var(--transition-smooth)' }}
          >
            {/* Chat bubble with circuit pattern */}
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H7L12 22L17 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* AI Circuit lines */}
            <path
              d="M8 8H10M14 8H16M8 12H12M14 12H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="group-hover:opacity-70 transition-opacity"
            />
          </svg>
          <span className="relative z-10 font-semibold">Ask me anything</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className="rebel-card w-96 h-[600px] flex flex-col"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)))',
          boxShadow: '0 0 40px hsl(var(--primary) / 0.2)',
        }}
      >
        {/* Header */}
        <div
          className="bg-gradient-to-r from-primary via-primary-glow to-primary text-primary-foreground p-4 rounded-t-xl flex justify-between items-center relative overflow-hidden"
          style={{
            boxShadow: '0 0 30px hsl(var(--primary) / 0.4)',
          }}
        >
          <div className="absolute inset-0 bg-primary-glow opacity-10 blur-3xl" />
          <div className="relative z-10">
            <h3 className="font-bold text-lg font-inter">
              Chat with Imran's AI
            </h3>
            <p className="text-xs opacity-90 font-mono">Powered by Claude</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="relative z-10 hover:bg-primary-foreground/10 p-2 rounded-lg transition-all"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50 backdrop-blur-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} fade-in-up`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div
                className={`max-w-[80%] rounded-xl p-3 font-inter text-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg relative overflow-hidden'
                    : 'bg-card/80 backdrop-blur-sm text-foreground border border-border shadow-md'
                }`}
                style={msg.role === 'user' ? {
                  boxShadow: '0 0 20px hsl(var(--primary) / 0.3)',
                } : {}}
              >
                {msg.role === 'user' && (
                  <div className="absolute inset-0 bg-primary-glow opacity-10 blur-xl" />
                )}
                <p className="relative z-10 whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start fade-in-up">
              <div className="bg-card/80 backdrop-blur-sm text-foreground shadow-md rounded-xl p-3 border border-border">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ boxShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}
                  />
                  <div
                    className="w-2 h-2 bg-primary-glow rounded-full animate-bounce"
                    style={{
                      animationDelay: '0.1s',
                      boxShadow: '0 0 10px hsl(var(--primary-glow) / 0.5)'
                    }}
                  />
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{
                      animationDelay: '0.2s',
                      boxShadow: '0 0 10px hsl(var(--primary) / 0.5)'
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card/80 backdrop-blur-sm rounded-b-xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about skills, availability, or projects..."
              className="flex-1 bg-background/50 backdrop-blur-sm border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ring text-sm text-foreground placeholder:text-muted-foreground font-inter transition-all focus:border-primary"
              disabled={isLoading}
              aria-label="Chat message input"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-primary hover:bg-primary-glow disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground rounded-lg px-4 py-2 transition-all shadow-md hover:shadow-lg relative overflow-hidden group"
              style={{
                boxShadow: '0 0 15px hsl(var(--primary) / 0.3)',
                transition: 'var(--transition-smooth)'
              }}
              aria-label="Send message"
            >
              <div className="absolute inset-0 bg-primary-glow opacity-0 group-hover:opacity-30 blur-lg transition-opacity" />
              <Send size={18} className="relative z-10" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center font-mono">
            Questions help improve this assistant
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;