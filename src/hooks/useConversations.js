import { useState, useCallback, useRef, useEffect } from 'react';
import React from 'react';

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function getStoredSessions() {
  try {
    const raw = localStorage.getItem('cn_gpt_sessions');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveSessions(sessions) {
  try { localStorage.setItem('cn_gpt_sessions', JSON.stringify(sessions)); } catch {}
}

export function useConversations() {
  const [sessions, setSessions] = useState(() => {
    const stored = getStoredSessions();
    if (stored.length > 0) return stored;
    const id = generateId();
    return [{ id, title: 'New Chat', messages: [], createdAt: Date.now() }];
  });
  const [activeId, setActiveId] = useState(() => {
    const stored = getStoredSessions();
    return stored.length > 0 ? stored[0].id : sessions[0]?.id;
  });

  // Keep a ref in sync so addMessage/updateMessage always read the latest
  // activeId even when called from stale closures (e.g. after newSession())
  const activeIdRef = React.useRef(activeId);
  useEffect(() => { activeIdRef.current = activeId; }, [activeId]);

  const persist = useCallback((updated) => {
    setSessions(updated);
    saveSessions(updated);
  }, []);

  const activeSession = sessions.find(s => s.id === activeId) || sessions[0];

  const newSession = useCallback(() => {
    const id = generateId();
    const session = { id, title: 'New Chat', messages: [], createdAt: Date.now() };
    const updated = [session, ...sessions];
    persist(updated);
    setActiveId(id);
    activeIdRef.current = id;   // update ref immediately — no waiting for re-render
    return id;
  }, [sessions, persist]);

  const selectSession = useCallback((id) => {
    setActiveId(id);
    activeIdRef.current = id;
  }, []);

  const addMessage = useCallback((msg) => {
    const currentId = activeIdRef.current;
    setSessions(prev => {
      const updated = prev.map(s => {
        if (s.id !== currentId) return s;
        const messages = [...s.messages, msg];
        const title = s.title === 'New Chat' && msg.role === 'user'
          ? msg.text.slice(0, 40) + (msg.text.length > 40 ? '…' : '')
          : s.title;
        return { ...s, messages, title };
      });
      saveSessions(updated);
      return updated;
    });
  }, []);   // no deps — reads from ref, never stale

  const updateMessage = useCallback((msgId, patch) => {
    const currentId = activeIdRef.current;
    setSessions(prev => {
      const updated = prev.map(s => {
        if (s.id !== currentId) return s;
        return {
          ...s,
          messages: s.messages.map(m => m.id === msgId ? { ...m, ...patch } : m)
        };
      });
      saveSessions(updated);
      return updated;
    });
  }, []);   // no deps — reads from ref, never stale

  const renameSession = useCallback((id, title) => {
    const updated = sessions.map(s => s.id === id ? { ...s, title } : s);
    persist(updated);
  }, [sessions, persist]);

  const deleteSession = useCallback((id) => {
    const updated = sessions.filter(s => s.id !== id);
    if (updated.length === 0) {
      const newId = generateId();
      const fresh = [{ id: newId, title: 'New Chat', messages: [], createdAt: Date.now() }];
      persist(fresh);
      setActiveId(newId);
    } else {
      persist(updated);
      if (activeId === id) setActiveId(updated[0].id);
    }
  }, [sessions, activeId, persist]);

  return {
    sessions, activeId, activeSession,
    newSession, selectSession,
    addMessage, updateMessage,
    renameSession, deleteSession,
  };
}
