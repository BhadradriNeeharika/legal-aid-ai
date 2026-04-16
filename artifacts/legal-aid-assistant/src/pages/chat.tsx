import React, { useState, useRef, useEffect } from 'react';
import { Send, PhoneCall, HeartHandshake, ShieldAlert, Volume2, Square, Info } from 'lucide-react';
import { useSendMessage, useGetChatHistory, getGetChatHistoryQueryKey, useGetHelplines } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TypingIndicator } from '@/components/ui/typing-indicator';
import { useSpeech } from '@/hooks/use-speech';
import { Layout } from '@/components/layout';

function MessageBubble({ message, isLast }: { message: any, isLast: boolean }) {
  const isUser = message.role === 'user';
  const { isSpeaking, speak, stop } = useSpeech();

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 ${isUser ? 'bg-primary text-primary-foreground rounded-tr-sm shadow-md' : 'bg-card text-card-foreground shadow-sm border border-card-border rounded-tl-sm'}`}>
        {!isUser && (
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary">Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
              onClick={() => isSpeaking ? stop() : speak(message.content)}
              aria-label={isSpeaking ? "Stop speaking" : "Read aloud"}
            >
              {isSpeaking ? <Square className="w-3 h-3 fill-current" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
        )}
        
        <div className="prose prose-sm dark:prose-invert max-w-none text-inherit leading-relaxed whitespace-pre-wrap font-medium">
          {message.content}
        </div>
        
        {message.category && (
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant={isUser ? "secondary" : "outline"} className="text-xs opacity-90">
              {message.category}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [input, setInput] = useState('');
  const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { data: history = [], isLoading: isLoadingHistory } = useGetChatHistory({
    query: { queryKey: getGetChatHistoryQueryKey() }
  });
  
  const { data: emergencyHelplines = [] } = useGetHelplines({}, {
    query: { queryKey: ['helplines-emergency'] }
  });

  const sendMessageMutation = useSendMessage();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, sendMessageMutation.isPending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sendMessageMutation.isPending) return;

    const messageText = input;
    setInput('');
    
    sendMessageMutation.mutate({ data: { message: messageText } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetChatHistoryQueryKey() });
      },
      onError: (err) => {
        console.error("Failed to send message", err);
      }
    });
  };

  const welcomeMessage = {
    id: 'welcome',
    role: 'assistant',
    content: "Welcome to Legal Aid Assistant. You can ask me about your legal rights related to domestic violence, sexual harassment, dowry, women's safety laws, and more. I'm here to listen and help you understand your options.",
    category: null,
    createdAt: new Date().toISOString()
  };

  const displayHistory = history.length > 0 ? history : [welcomeMessage];

  return (
    <Layout>
      <div className="flex flex-col h-full md:flex-row">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full border-r border-border">
          <ScrollArea className="flex-1 p-4 sm:p-6 bg-[#faf9f8] dark:bg-background" ref={scrollRef}>
            <div className="max-w-3xl mx-auto flex flex-col justify-end min-h-full pb-4">
              {displayHistory.map((msg, idx) => (
                <MessageBubble key={msg.id} message={msg} isLast={idx === displayHistory.length - 1} />
              ))}
              
              {sendMessageMutation.isPending && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
              
              {/* Show recommended resources from the latest response if available */}
              {sendMessageMutation.isSuccess && sendMessageMutation.data && !sendMessageMutation.isPending && (
                <div className="max-w-[85%] sm:max-w-[75%] ml-0 mt-2 mb-6">
                  {sendMessageMutation.data.helplines?.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5 text-muted-foreground"><PhoneCall className="w-4 h-4" /> Recommended Helplines</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {sendMessageMutation.data.helplines.slice(0, 2).map((helpline: any) => (
                          <Card key={helpline.id} className="bg-card">
                            <CardContent className="p-3">
                              <p className="font-medium text-sm">{helpline.name}</p>
                              <p className="text-primary font-semibold text-lg">{helpline.phone}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 bg-background border-t border-border shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.05)]">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your legal question here safely..."
                  className="flex-1 h-14 rounded-2xl bg-card border-input focus-visible:ring-primary shadow-sm text-base px-5"
                  disabled={sendMessageMutation.isPending}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="h-14 w-14 rounded-2xl shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground transition-all active:scale-95"
                  disabled={!input.trim() || sendMessageMutation.isPending}
                >
                  <Send className="w-5 h-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
              <div className="mt-3 text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Info className="w-3 h-3" />
                This AI provides legal information, not formal legal advice.
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Emergency Info */}
        <div className="w-full md:w-80 bg-sidebar border-l border-sidebar-border hidden lg:block overflow-y-auto p-5">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
            <PhoneCall className="w-5 h-5 text-destructive" />
            Quick Emergency
          </h3>
          
          <div className="space-y-3">
            {emergencyHelplines.slice(0, 5).map((helpline) => (
              <Card key={helpline.id} className="border border-destructive/20 bg-destructive/5 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{helpline.name}</span>
                    <a href={`tel:${helpline.phone}`} className="text-xl font-bold text-destructive hover:underline mt-1">
                      {helpline.phone}
                    </a>
                    {helpline.category && (
                      <Badge variant="outline" className="w-fit mt-2 border-destructive/30 text-destructive/80 text-[10px]">
                        {helpline.category}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-4 bg-primary/10 rounded-xl border border-primary/20">
            <h4 className="font-medium text-primary flex items-center gap-2 mb-2">
              <HeartHandshake className="w-4 h-4" />
              You are not alone
            </h4>
            <p className="text-sm text-muted-foreground">
              If you are in immediate physical danger, please call the police at 100 or women's helpline 1091 immediately.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}