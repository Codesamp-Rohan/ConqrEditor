import { useAIStore } from '@/store/aiStore';
import { Plus, Check, X, Brain, Sparkle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { askGemini } from '@/lib/ai/gemini';
import { useSettingsStore } from '@/store/settingsStore';
import { generateAIResponse } from '@/lib/ai';

export default function AISidebar() {
  const selectedText = useAIStore((state) => state.selectedText);
  const setAIResponse = useAIStore((state) => state.setAIResponse);
  const { provider } = useSettingsStore();
  const [prompt, setPrompt] = useState('');
  const pendingSuggestion = useAIStore((state) => state.pendingSuggestion);
  const clearConversation = useAIStore((state) => state.clearConversation);
  const setPendingSuggestion = useAIStore(
    (state) => state.setPendingSuggestion
  );
  const setLoading = useAIStore((state) => state.setLoading);
  const loading = useAIStore((state) => state.loading);
  const clearPendingSuggestion = useAIStore(
    (state) => state.clearPendingSuggestion
  );
  const documentText = useAIStore((state) => state.documentText);
  const { messages, addMessage } = useAIStore();
  const messagesEndRef = useRef(null);
  const { geminiApiKey, groqApiKey } = useSettingsStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, loading, pendingSuggestion]);

  async function handleRewrite() {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const apiKey = useSettingsStore.getState().geminiApiKey;
      const updatedMessages = [
        ...messages,
        {
          role: 'user',
          content: prompt,
        },
      ];

      addMessage({
        role: 'user',
        content: prompt,
      });

      const history = updatedMessages
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join('\n');

      const response = await generateAIResponse({
        provider,
        prompt,
        selectedText,
        documentText,
        history,
      });
      const messageMatch = response.match(/MESSAGE:\s*([\s\S]*?)SUGGESTION:/i);

      const suggestionMatch = response.match(/SUGGESTION:\s*([\s\S]*)/i);

      const message = messageMatch?.[1]?.trim() || response;

      const suggestion = suggestionMatch?.[1]?.trim() || '';
      addMessage({
        role: 'assistant',
        content: message,
      });

      if (suggestion && suggestion !== message) {
        setPendingSuggestion(suggestion);
      }

      setPrompt('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-[380px] max-h-[90vh] h-[-webkit-fill-available] bg-[var(--white-secondary)] border-l border-[var(--border-muted)] flex flex-col overflow-hidden"
      style={{ borderRadius: '0 .5rem .5rem 0' }}
    >
      {/* Header */}
      <div className="p-1 flex items-center justify-between">
        <h2 className="font-semibold text-sm pl-3">Conqr AI</h2>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="relative flex h-1 w-1">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full ${geminiApiKey === '' && groqApiKey === '' ? 'bg-red-400' : 'bg-green-400'} opacity-75`}
              />

              <span
                className={`relative inline-flex h-1 w-1 rounded-full ${geminiApiKey === '' && groqApiKey === '' ? 'bg-red-500' : 'bg-green-500'}`}
              />
            </span>

            <p className="text-[8px] uppercase text-[--text-muted]">
              {provider}
            </p>
          </span>
          <button
            onClick={() => {
              clearConversation();
              clearPendingSuggestion();
              setPrompt('');
            }}
            className="flex items-center gap-1 py-1 px-1 rounded-md hover:bg-[var(--conqr-secondary)] hover:text-[var(--hover)] text-[11px] bg-[var(--foreground)] cursor-pointer hover:shadow-xl shadow-black/5 hover:translate-y-[-1px] transition-[800ms]"
          >
            <Plus size={10} />
            New Chat
          </button>
        </span>
      </div>
      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        <div className="space-y-4">
          {/* Selected Text */}
          <div>
            <div className="mb-2 !text-[8px] uppercase text-[--text-secondary]">
              Selected Text
            </div>

            <div
              className="border-l-2 border-l-[#bbb] bg-[#ddd] p-1 text-[11px] whitespace-pre-wrap"
              style={{ maxHeight: '140px', overflow: 'auto' }}
            >
              {selectedText || 'No text selected'}
            </div>
          </div>
          {/* Conversation */}
          {messages.length > 0 && (
            <div>
              <p className="mb-2 !text-[8px] uppercase text-[--text-muted]">
                Conversation
              </p>

              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`!rounded-none border w-[90%] whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'ml-auto bg-[#0c416044] text-[var(--conqr-secondary)] border-y-0 border-l-0 border-r-[var(--conqr-secondary)] border-r-4'
                        : 'bg-[var(--white)] text-[var(--conqr-secondary)] border-1 border-l-4 !text-[#777] border-[#ccc]'
                    }`}
                    style={{
                      padding: '.5rem',
                      marginBottom: '.25rem',
                      borderRadius:
                        message.role === 'user'
                          ? '.5rem .5rem 0 .5rem'
                          : '.5rem .5rem .5rem 0',
                    }}
                  >
                    <p
                      className="px-1 flex gap-[.15rem] items-center rounded-md uppercase opacity-60 !text-[6px]"
                      style={{
                        fontWeight: 900,
                        backgroundColor:
                          message.role === 'user' ? '#ffffff44' : '#00000022',
                        width: 'fit-content',
                        margin: 0,
                      }}
                    >
                      {message.role !== 'user' && <Sparkle size={6} />}
                      {message.role}
                    </p>

                    <p
                      className="text-[11px] !mt-2"
                      style={{ margin: 0, lineHeight: '110%' }}
                    >
                      {message.content?.replace(/MESSAGE:/gi, '')?.trim()}
                    </p>
                  </div>
                ))}
              </div>
              {loading && (
                <div className="mb-2 flex items-center gap-1 text-[8px] uppercase text-[--text-muted] font-mono">
                  <span>AI is thinking</span>

                  <div className="flex">
                    <span className="animate-bounce [animation-delay:0ms]">
                      .
                    </span>

                    <span className="animate-bounce [animation-delay:150ms]">
                      .
                    </span>

                    <span className="animate-bounce [animation-delay:300ms]">
                      .
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* AI Suggestion */}
          {pendingSuggestion && (pendingSuggestion !== '---' || pendingSuggestion !== 'None' || pendingSuggestion !== 'None needed.') && (
            <div>
              <div className="mb-2 !text-[8px] uppercase text-[--text-muted]">
                Suggestion
              </div>

              <div
                className="border-l-2 border-l-[#bbb] bg-[#ddd] p-1 text-[11px] whitespace-pre-wrap"
                style={{ maxHeight: '140px', overflow: 'auto' }}
              >
                {pendingSuggestion}
              </div>

              <div className="content-center" style={{ marginTop: '6px' }}>
                <button
                  onClick={() => {
                    setAIResponse(pendingSuggestion);
                    clearPendingSuggestion();
                  }}
                  className="flex-1 rounded-lg bg-[var(--conqr-secondary)] w-fit px-2 py-1 text-xs text-white"
                  style={{ width: 'fit-content' }}
                >
                  <Check size={10} />
                </button>

                <button
                  onClick={clearPendingSuggestion}
                  className="flex-1 rounded-lg border border-[var(--border)] px-2 py-1 text-xs !bg-red-500 text-white"
                  style={{ backgroundColor: 'red', width: 'fit-content' }}
                >
                  <X size={10} />
                </button>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input */}
      <div className="border-t border-[var(--border)] p-3">
        {/* Input */}
        <div className="border-t border-[var(--border)] p-1 space-y-2 flex items-center gap-1">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleRewrite();
              }
            }}
            placeholder="Ask Conqr.ai..."
            className="w-full border-b-2 border-b-[#bbb] bg-[#ddd] px-2 !mb-0 text-[11px] py-1 font-mono outline-none focus:border-[var(--primary)]"
            style={{ marginBlockEnd: 0 }}
          />

          <button
            onClick={handleRewrite}
            className="w-fit flex gap-1 items-center rounded-lg bg-[var(--conqr-secondary)] px-2 py-1 text-[11px] font-mono text-white hover:opacity-90 transition-opacity cursor-pointer"
          >
            {loading ? <Check size={11} /> : <Brain size={11} />}
            {loading ? 'Thinking...' : 'Think'}
          </button>
        </div>
      </div>
    </div>
  );
}
