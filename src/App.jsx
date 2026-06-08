import React, { useState, useEffect, useRef, useCallback } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import ChatMessage from './components/ChatMessage.jsx';
import ChatInput from './components/ChatInput.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import CompanySelector from './components/CompanySelector.jsx';
import { useConversations } from './hooks/useConversations.js';
import { useStreaming } from './hooks/useStreaming.js';
import { matchQuestion, checkAccessDenied, RESPONSE_TYPES } from './utils/matcher.js';
import { getCompanyData, COMPANY_REGISTRY } from './data/mockData.js';

function generateId() { return Math.random().toString(36).slice(2, 10); }

const STREAM_DURATION = {
  COMPANY_OVERVIEW: 2800, FUNDING_LENDING: 2400, LEAKAGE: 2200,
  PRODUCTS: 2000, INCOME: 2200, ECOSYSTEM: 3200, MEETING_PREP: 2600, UNKNOWN: 600,
};

export default function App() {
  // Always start with selector shown — first screen is always company picker
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [showSelector, setShowSelector] = useState(true);

  const {
    sessions, activeId, activeSession,
    newSession, selectSession,
    addMessage, updateMessage,
    renameSession, deleteSession,
  } = useConversations();

  const { streaming, streamContent } = useStreaming();
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages?.length, activeId]);

  // ── Company selection flow ───────────────────────────────────────────────
  // Each company selection = fresh session (mirrors real product behavior)
  const handleSelectCompany = useCallback((company) => {
    setSelectedCompany(company);
    setCompanyData(getCompanyData(company.id));
    setShowSelector(false);
    newSession();
  }, [newSession]);

  // ── Message handling ─────────────────────────────────────────────────────
  const handleSend = useCallback((text) => {
    if (streaming || !selectedCompany) return;

    // 1. Add user message
    addMessage({ id: generateId(), role: 'user', text, timestamp: Date.now() });

    // 2. Check access control — does query mention a company the RM can't access?
    const accessCheck = checkAccessDenied(text);
    if (accessCheck.denied) {
      addMessage({
        id: generateId(), role: 'assistant',
        type: RESPONSE_TYPES.ACCESS_DENIED,
        attemptedCompany: accessCheck.attemptedCompany,
        timestamp: Date.now() + 100,
        streaming: false, progress: 1,
      });
      return;
    }

    // 3. Match question type
    const type = matchQuestion(text);

    // 4. Add streaming assistant message
    const assistantId = generateId();
    addMessage({
      id: assistantId, role: 'assistant', type,
      text: '', timestamp: Date.now() + 100,
      streaming: true, progress: 0, feedback: null,
    });

    // 5. Stream
    const duration = STREAM_DURATION[type] || 2000;
    streamContent(
      (progress) => updateMessage(assistantId, { progress, streaming: true }),
      () => updateMessage(assistantId, { progress: 1, streaming: false }),
      duration
    );
  }, [streaming, selectedCompany, addMessage, updateMessage, streamContent]);

  const handleFeedback = useCallback((msgId, feedbackType, comment) => {
    updateMessage(msgId, { feedback: feedbackType, feedbackComment: comment });
  }, [updateMessage]);

  // ── Render ───────────────────────────────────────────────────────────────
  const messages = activeSession?.messages || [];
  const showWelcome = messages.length === 0 && selectedCompany && !showSelector;
  const showCompanySelector = !selectedCompany || showSelector;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Dark sidebar */}
      <Sidebar
        sessions={sessions}
        activeId={activeId}
        onNew={newSession}
        onSelect={selectSession}
        onRename={renameSession}
        onDelete={deleteSession}
        currentCompany={selectedCompany}
      />

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0, background: 'var(--bg)' }}>
        <Header
          currentCompany={selectedCompany}
          onNew={newSession}
        />

        {/* Company change banner */}
        {selectedCompany && (
          <div style={{
            background: '#fff', borderBottom: '1px solid var(--border)',
            padding: '6px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6, background: 'var(--red-light)',
                border: '1px solid var(--red-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700, color: 'var(--red)', flexShrink: 0,
              }}>{selectedCompany.initials}</div>
              <span style={{ color: 'var(--text-2)' }}>Client:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>{selectedCompany.name}</span>
            </div>
            <button
              onClick={() => setShowSelector(true)}
              style={{
                fontSize: 11, color: 'var(--red)', fontWeight: 500,
                padding: '4px 10px', borderRadius: 6,
                border: '1px solid var(--red-border)',
                background: 'var(--red-light)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--red-mid)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--red-light)'}
            >
              Change Client →
            </button>
          </div>
        )}

        {/* Content area */}
        {showCompanySelector ? (
          <CompanySelector onSelect={handleSelectCompany}/>
        ) : showWelcome ? (
          <WelcomeScreen onSend={handleSend} company={selectedCompany}/>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 8px', background: 'var(--bg-2)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  msg={msg}
                  onFeedback={handleFeedback}
                  companyData={companyData}
                  activeSession={activeSession}
                />
              ))}
              <div ref={messagesEndRef}/>
            </div>
          </div>
        )}

        {/* Input */}
        {!showCompanySelector && (
          <ChatInput
            onSend={handleSend}
            disabled={streaming}
            company={selectedCompany}
          />
        )}
      </div>
    </div>
  );
}
