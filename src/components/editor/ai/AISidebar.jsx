import { useAIStore } from '@/store/aiStore';
import {
  Plus,
  Check,
  X,
  Brain,
  Sparkles,
  Sparkle,
  ShieldAlert,
  Loader2,
  Send,
  BookOpen,
  Lightbulb,
} from 'lucide-react';
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
  const scrollRef = useRef(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);
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

      const invalidSuggestions = [
        '---',
        'None',
        'None needed.',
        'No suggestion.',
        'N/A',
        '',
      ];

const cleanSuggestion = suggestion?.trim();

const lowerSuggestion = cleanSuggestion?.toLowerCase();

const metaResponses = [
  'none needed',
  'no suggestion',
  'no changes needed'
];

const isMetaResponse = metaResponses.some((item) =>
  lowerSuggestion?.includes(item)
);

const shouldShowSuggestion = selectedText && cleanSuggestion && !invalidSuggestions.includes(cleanSuggestion) && !isMetaResponse;


      if (shouldShowSuggestion) {
        setPendingSuggestion({
          selectedText,
          suggested: cleanSuggestion,
        });
      }

      setPrompt('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const isEmptyChat = messages.length === 0;

  return (
    <div
      className="w-[380px] max-h-[90vh] h-[-webkit-fill-available] flex flex-col overflow-hidden z-[999]"
      style={{ borderRadius: '0 .5rem .5rem 0' }}
    >
      {/* Header */}
      <div className="p-1 flex justify-end items-center justify-between">
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
      <div
        className={`min-h-0 overflow-y-auto p-4 ${isEmptyChat ? '' : 'flex-1'}`}
      >
        <div className="space-y-4">
          {/* Selected Text */}
          {selectedText && (
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
          )}
          {/* Conversation */}
          {messages.length > 0 && (
            <div>
              <div className="space-y-3">
                {messages.map((message, index) => {
                  // SPECIAL UI FOR APPLIED SUGGESTIONS
                  if (message.role === 'suggestion_applied') {
                    return (
                      <div
                        key={index}
                        className="rounded-2xl border-0 bg-[#f8f3ff] shadow-xl pt-2 pb-4 px-4 mb-4"
                      >
                        <div className="flex items-center gap-1">
                          <div className="relative flex h-1 w-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#792CA2] opacity-75" />

                            <span className="relative inline-flex rounded-full h-1 w-1 bg-[#792CA2]" />
                          </div>
                          <p className="text-[8px] !font-bold uppercase tracking-wide text-[#792CA2] font-black">
                            AI Suggestion Applied
                          </p>
                        </div>

                        {/* PREVIOUS */}
                        <div className="mb-3">
                          <p className="text-[9px] uppercase text-[#777] font-bold">
                            Previous
                          </p>

                          <div className="rounded-lg border border-[#e5e5e5] bg-white p-2 text-[11px] text-[#666] max-h-[200px] overflow-auto">
                            {message.original}
                          </div>
                        </div>

                        {/* UPDATED */}
                        <div>
                          <p className="text-[9px] uppercase text-[#792CA2] mb-1 font-bold">
                            Updated
                          </p>

                          <div className="rounded-lg border border-[#d8c4f3] bg-white p-2 text-[11px] text-[#792CA2] max-h-[200px] overflow-auto">
                            {message.updated}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // NORMAL CHAT UI
                  return (
                    <div
                      key={index}
                      className={`rounded-xl border w-[70%] w-fit min-w-[40%] whitespace-pre-wrap ${
                        message.role === 'user'
                          ? 'ml-auto bg-gradient-to-br from-[var(--conqr-secondary)] to-[var(--conqr-secondary-light)] text-[var(--white)]'
                          : 'bg-[#e0e0e0] text-[var(--conqr-secondary)] border-1 border-[#d7d7d7] p-0 max-w-[80%] !text-[#777] shadow-xl shadow-black/5'
                      }`}
                      style={{
                        padding: '.5rem',
                        marginBottom:
                          message.role === 'user' ? '.25rem' : '1rem',
                      }}
                    >
                      {message.role !== 'user' && (
                        <p
                          className="px-1 flex gap-[.15rem] items-center rounded-md uppercase !text-[8px]"
                          style={{
                            fontWeight: 900,
                            backgroundColor:
                              message.role === 'user'
                                ? '#ffffff44'
                                : '#00000012',
                            width: 'fit-content',
                            margin: 0,
                            marginBottom: '.5rem',
                          }}
                        >
                          {message.role !== 'user' && <Sparkle size={6} />}
                          {message.role}
                        </p>
                      )}

                      <p
                        className="text-[11px]"
                        style={{ margin: 0, lineHeight: '110%' }}
                      >
                        {message.content?.replace(/MESSAGE:/gi, '')?.trim()}
                      </p>
                    </div>
                  );
                })}
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
          {/* AI Suggestion */}
          {pendingSuggestion && (
            <div className="relative">
              <div
                className="bg-[#792CA214] border border-[#792CA220] p-3 rounded-xl text-[11px] whitespace-pre-wrap"
                style={{
                  maxHeight: '260px',
                  overflow: 'auto',
                  lineHeight: '120%',
                }}
              >
                <div
                  className="flex gap-[.15rem] items-center uppercase text-[8px] text-[#792CA2] mb-3"
                  style={{
                    fontWeight: 900,
                    width: 'fit-content',
                  }}
                >
                  <Lightbulb size={8} />
                  Suggestion
                </div>

                {/* Original Text */}
                <div className="mb-3">
                  <p className="uppercase text-[8px] text-[#777] mb-1 text-red-500 font-black">
                    Changeable Text
                  </p>

                  <div className="bg-[#fff] border-l-2 border-[#ff000044] p-2 text-[#ff000077]">
                    {selectedText ||
                      pendingSuggestion.selectedText ||
                      'No selected text'}
                  </div>
                </div>

                {/* Suggested Text */}
                <div>
                  <p className="uppercase text-[8px] text-[#792CA2] mb-1 font-black">
                    Suggested Text
                  </p>

                  <div className="bg-white border-l-2 border-[#d7c4e2] p-2 text-[#792CA2]">
                    {pendingSuggestion.suggested}
                  </div>
                </div>
              </div>

              <div className="flex gap-1 absolute bottom-[-1rem] right-2">
                <button
                  onClick={() => {
                    const originalText =
                      selectedText || pendingSuggestion.selectedText;
                    const updatedText = pendingSuggestion.suggested;
                    setAIResponse(updatedText);
                    addMessage({
                      role: 'suggestion_applied',
                      original: originalText,
                      updated: updatedText,
                    });
                    clearPendingSuggestion();
                  }}
                  className="rounded-lg text-xs text-green-700 flex items-center gap-1 cursor-pointer"
                >
                  <Check size={12} />
                </button>

                <button
                  onClick={clearPendingSuggestion}
                  className="rounded-lg text-xs text-red-500 flex items-center gap-1 cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input */}
      <div
        className={`transition-all duration-500 ${
          isEmptyChat ? 'flex-1 flex items-center justify-center px-6' : 'px-2'
        }`}
      >
        <div
          className={`rounded-[28px]  transition-all duration-500 ${
            isEmptyChat ? 'w-full max-w-[340px]' : 'w-full'
          }`}
        >
          {/* EMPTY CHAT HERO */}
          {isEmptyChat && (
            <div>
              <h1
                className="text-[32px] !font-medium leading-[95%] tracking-[-0.04em] text-[#2f2f2f] heading-serif"
              >
                What shall we{' '}
                <span className="italic text-[#c6a66e]">work on?</span>
              </h1>

              <p className="mt-3 text-[13px] text-[#8a8a8a]">
                Ask anything, or describe changes to make.
              </p>
            </div>
          )}

          <div className={`my-2 flex heading-serif ${isEmptyChat ? 'flex-wrap' : 'flex-nowrap'} overflow-auto gap-1 scrollbar-hide`}>
            {[
              'Summarize this document',
              'Rewrite professionally',
              'Find legal risks',
              'Improve clarity',
            ].map((item) => (
              <button
                key={item}
                onClick={() => setPrompt(item)}
                className="rounded-full border border-[#e6ddcf] bg-white/70 px-2 py-1 text-[11px] text-[#6d6d6d] backdrop-blur-sm transition-all hover:border-[#d4c3a7] text-nowrap hover:bg-white hover:shadow-md cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="relative overflow-hidden bg-white rounded-[16px] px-4 py-4 shadow-inner border-1 border-[#ddd] flex items-end">
            {/* Input */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleRewrite();
                }
              }}
              rows={isEmptyChat ? 6 : 4}
              placeholder="Initiate a query or send a command to the AI..."
              className={`w-full heading-serif resize-none bg-transparent pr-4 outline-none transition-all ${
                isEmptyChat
                  ? 'text-[14px] text-[#1d1d1d] placeholder:text-[#a1a1a1]'
                  : 'text-[14px] text-[#1d1d1d] placeholder:text-[#9b9b9b]'
              }`}
            />

            <button
              onClick={handleRewrite}
              className="flex p-2 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--conqr-secondary)] to-[var(--conqr-secondary-light)] text-white shadow-[0_8px_20px_rgba(123,97,255,0.35)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
