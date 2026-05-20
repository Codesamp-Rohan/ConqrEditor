import { useAIStore } from '@/store/aiStore';
import { Plus, Check, X } from 'lucide-react';
import { useState } from 'react';
import { askGemini } from '@/lib/ai/gemini';
import { useSettingsStore } from '@/store/settingsStore';

export default function AISidebar() {
  const selectedText = useAIStore((state) => state.selectedText);
  const setAIResponse = useAIStore((state) => state.setAIResponse);
  const [prompt, setPrompt] = useState('');

  const pendingSuggestion = useAIStore((state) => state.pendingSuggestion);
  const setPendingSuggestion = useAIStore(
    (state) => state.setPendingSuggestion
  );
  const setLoading = useAIStore((state) => state.setLoading);
  const loading = useAIStore((state) => state.loading);
  const clearPendingSuggestion = useAIStore(
    (state) => state.clearPendingSuggestion
  );
    const documentText =
        useAIStore(
            (state) =>
                state.documentText
        );
    const { messages, addMessage } = useAIStore();

  async function handleRewrite() {
      if (!prompt.trim()) return;

    try {
      setLoading(true);

      const apiKey = useSettingsStore.getState().geminiApiKey;
        const updatedMessages = [
            ...messages,
            {
                role: "user",
                content: prompt,
            },
        ];

        addMessage({
            role: "user",
            content: prompt,
        });

        const history =
            updatedMessages
                .map(
                    (msg) =>
                        `${msg.role}: ${msg.content}`
                )
                .join("\n");

      const result = await askGemini({
        apiKey,
          prompt: `You are a conversational AI assistant inside a professional writing editor.
IMPORTANT RULES:

- If the user asks to rewrite, improve, transform, capitalize, shorten, expand, or modify text:
  return BOTH:
  1. a short conversational response
  2. the rewritten content

FORMAT:

MESSAGE:
<short assistant reply>

SUGGESTION:
<rewritten content>

---

- If no rewrite is needed, leave SUGGESTION empty.

- NEVER explain the rewrite inside suggestion.
- ONLY place actual replacement text inside SUGGESTION.

FULL DOCUMENT CONTEXT:
${documentText}

Selected Text:
${selectedText}

Conversation History:
${history}

User:
${prompt}
`,
      });
        const messageMatch =
            result.match(
                /MESSAGE:\s*([\s\S]*?)SUGGESTION:/i
            );

        const suggestionMatch =
            result.match(
                /SUGGESTION:\s*([\s\S]*)/i
            );

        const message =
            messageMatch?.[1]?.trim() ||
            result;

        const suggestion =
            suggestionMatch?.[1]?.trim() ||
            "";
        addMessage({
            role: "assistant",
            content: message,
        });

        if (
            suggestion &&
            suggestion !== message
        ) {
            setPendingSuggestion(
                suggestion
            );
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
      className="w-[380px] max-h-[90vh] h-[-webkit-fill-available] bg-[var(--conqr-muted)] border-l border-[var(--border-muted)] flex flex-col overflow-hidden"
      style={{ borderRadius: '0 .5rem .5rem 0' }}
    >
      {/* Header */}
      <div className="p-1 flex items-center justify-between">
        <h2 className="font-semibold text-sm pl-3">Conqr AI</h2>
        <button className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-[var(--conqr-secondary)] hover:text-[var(--hover)] text-sm bg-[var(--foreground)] cursor-pointer hover:shadow-xl shadow-black/5 hover:translate-y-[-1px] transition-[800ms]">
          <Plus size={14} />
          New Chat
        </button>
      </div>
      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        <div className="space-y-4">
          {/* Selected Text */}
          <div>
            <div className="mb-2 !text-[8px] uppercase text-[--text-secondary]">
              Selected Text
            </div>

            <div className="rounded-md bg-[var(--conqr-primary)] border border-[var(--border)] p-1 text-[11px] whitespace-pre-wrap">
              {selectedText || 'No text selected'}
            </div>
          </div>
            {/* Conversation */}
            {messages.length > 0 && (
                <div>
                    <div className="mb-2 text-[11px] uppercase text-[--text-muted]">
                        Conversation
                    </div>

                    <div className="space-y-3">
                        {messages.map(
                            (message, index) => (
                                <div
                                    key={index}
                                    className={`rounded-md border p-2 text-[11px] whitespace-pre-wrap ${
                                        message.role ===
                                        "user"
                                            ? "ml-auto bg-[var(--conqr-secondary)] text-white border-transparent"
                                            : "bg-[var(--conqr-primary)] border-[var(--border)]"
                                    }`}
                                >
                                    <div className="mb-1 text-[9px] uppercase opacity-60">
                                        {message.role}
                                    </div>

                                    <div>
                                        {message.content}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
          {/* AI Suggestion */}
          {pendingSuggestion && (
            <div>
              <div className="mb-2 text-[11px] uppercase text-[--text-muted]">
                Suggestion
              </div>

              <div className="rounded-md bg-[var(--conqr-primary)] border border-[var(--border)] p-1 text-[11px] whitespace-pre-wrap">
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
            className="w-full rounded-md border !border-[var(--hover)] bg-transparent px-2 !mb-0 text-[11px] py-1 font-mono outline-none focus:border-[var(--primary)]"
            style={{ marginBlockEnd: 0 }}
          />

          <button
            onClick={handleRewrite}
            className="w-fit rounded-lg bg-[var(--conqr-secondary)] px-4 py-1 text-[11px] font-mono text-white hover:opacity-90 transition-opacity cursor-pointer"
          >
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
