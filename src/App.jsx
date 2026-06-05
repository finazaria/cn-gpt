import React, { useState, useEffect, useRef, useCallback } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import ChatMessage from './components/ChatMessage.jsx';
import ChatInput from './components/ChatInput.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import { useConversations } from './hooks/useConversations.js';
import { useStreaming } from './hooks/useStreaming.js';
import { matchQuestion } from './utils/matcher.js';

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

// Streaming durations per response type
const STREAM_DURATION = {
  COMPANY_OVERVIEW: 2800,
  FUNDING_LENDING: 2400,
  LEAKAGE: 2200,
  PRODUCTS: 2000,
  INCOME: 2200,
  MEETING_PREP: 2600,
  UNKNOWN: 600,
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    sessions, activeId, activeSession,
    newSession, selectSession,
    addMessage, updateMessage,
    renameSession, deleteSession,
  } = useConversations();

  const { streaming, streamContent } = useStreaming();
  const messagesEndRef = useRef(null);
  const cancelStreamRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages?.length, activeId]);

  const handleSend = useCallback((text) => {
    if (streaming) return;

    // Add user message
    const userMsg = {
      id: generateId(),
      role: 'user',
      text,
      timestamp: Date.now(),
    };
    addMessage(userMsg);

    // Determine response type
    const type = matchQuestion(text);

    // Add assistant message placeholder
    const assistantId = generateId();
    const assistantMsg = {
      id: assistantId,
      role: 'assistant',
      type,
      text: '',
      timestamp: Date.now() + 100,
      streaming: true,
      progress: 0,
      feedback: null,
    };
    addMessage(assistantMsg);

    // Stream it
    const duration = STREAM_DURATION[type] || 2000;
    const cancel = streamContent(
      (progress) => {
        updateMessage(assistantId, { progress, streaming: true });
      },
      () => {
        updateMessage(assistantId, { progress: 1, streaming: false });
      },
      duration
    );
    cancelStreamRef.current = cancel;
  }, [streaming, addMessage, updateMessage, streamContent]);

  const handleFeedback = useCallback((msgId, feedbackType, comment) => {
    updateMessage(msgId, {
      feedback: feedbackType,
      feedbackComment: comment,
    });
  }, [updateMessage]);

  const messages = activeSession?.messages || [];
  const showWelcome = messages.length === 0;

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        activeId={activeId}
        onNew={newSession}
        onSelect={selectSession}
        onRename={renameSession}
        onDelete={deleteSession}
        collapsed={!sidebarOpen}
        onToggle={() => setSidebarOpen(p => !p)}
      />

      {/* Main content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        overflow: 'hidden', minWidth: 0,
      }}>
        <Header
          activeSession={activeSession}
          onToggleSidebar={() => setSidebarOpen(p => !p)}
        />

        {/* Chat area */}
        {showWelcome ? (
          <WelcomeScreen onSend={handleSend} />
        ) : (
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: '24px 24px 8px',
            background: 'var(--bg-2)',
          }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              {messages.map((msg, i) => (
                <ChatMessage
                  key={msg.id}
                  msg={msg}
                  onFeedback={handleFeedback}
                  isLast={i === messages.length - 1}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Input */}
        <div style={{
          background: showWelcome ? 'transparent' : '#fff',
          borderTop: showWelcome ? 'none' : '1px solid var(--border)',
          paddingTop: 14,
        }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <ChatInput
              onSend={handleSend}
              disabled={streaming}
              showSuggestions={showWelcome}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
