import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { AnimatePresence, m } from 'framer-motion'
import { MessageCircle, X, ArrowUp, Square, RotateCcw } from 'lucide-react'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Streamdown } from 'streamdown'
import { code } from '@streamdown/code'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Suggestion } from '@/components/ai-elements/suggestion'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { AI_PROVIDERS, DEFAULT_PROVIDER, type AIProvider } from '@/lib/ai-providers'
import { cn } from '@/lib/utils'

const SUGGESTIONS = [
  'What services do you offer?',
  "What's your tech stack?",
  'Are you available for freelance?',
  'Tell me about your AI work',
]

const streamdownPlugins = { code }
const streamdownLinkSafety = { enabled: false } as const

const StreamdownMemo = memo(
  ({
    children,
    isAnimating,
  }: {
    children: string
    isAnimating: boolean
  }) => (
    <Streamdown
      plugins={streamdownPlugins}
      caret="block"
      isAnimating={isAnimating}
      linkSafety={streamdownLinkSafety}
    >
      {children}
    </Streamdown>
  ),
)
StreamdownMemo.displayName = 'StreamdownMemo'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [provider, setProvider] = useState<AIProvider>(DEFAULT_PROVIDER)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const chatTransport = useMemo(
    () => new DefaultChatTransport({ api: '/api/chat', body: { provider } }),
    [provider],
  )

  const { messages, sendMessage, status, stop, error, regenerate } = useChat({
    transport: chatTransport,
  })

  const isStreaming = status === 'streaming'
  const isLoading = status === 'submitted' || isStreaming

  useEffect(() => {
    if (isOpen) {
      // Delay focus to avoid iOS Safari auto-zoom during panel animation
      const timeout = setTimeout(() => textareaRef.current?.focus(), 300)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  const handleSend = useCallback(
    (text: string) => {
      if (!text.trim()) return
      sendMessage({ text })
      setInput('')
    },
    [sendMessage],
  )

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(input)
    }
  }

  return (
    <>
      {/* Floating action button */}
      <AnimatePresence>
        {!isOpen && (
          <m.button
            key="chat-fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(true)}
            className="fixed right-4 bottom-4 z-50 flex size-12 items-center justify-center rounded-full bg-accent text-background shadow-lg transition-transform hover:scale-105 active:scale-95 sm:right-5 sm:bottom-5 sm:size-14"
            aria-label="Open chat"
          >
            <MessageCircle className="size-5 sm:size-6" />
          </m.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              'fixed inset-0 z-100000 flex flex-col overflow-hidden bg-surface sm:inset-auto sm:right-5 sm:bottom-5 sm:z-50 sm:rounded-2xl sm:border sm:border-border sm:shadow-2xl',
              'h-dvh w-dvw sm:h-[min(550px,calc(100dvh-40px))] sm:w-[min(400px,calc(100vw-40px))]',
            )}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border px-3 py-2.5 sm:px-4 sm:py-3">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-full bg-accent-muted">
                  <MessageCircle className="size-3.5 text-accent" />
                </div>
                <h2 className="text-sm font-semibold text-text-primary">
                  Ask Gelo's AI
                </h2>
              </div>
              <div className="flex items-center gap-1">
                <select
                  value={provider}
                  onChange={(e) =>
                    setProvider(e.target.value as AIProvider)
                  }
                  disabled={isLoading}
                  className="rounded border border-border bg-surface-alt px-1.5 py-0.5 text-base text-text-secondary disabled:opacity-50 sm:text-xs"
                >
                  {AI_PROVIDERS.map((p) => (
                    <option key={p} value={p}>
                      {p.toUpperCase()}
                    </option>
                  ))}
                </select>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsOpen(false)}
                  className="size-7 text-text-secondary hover:bg-surface-alt hover:text-text-primary"
                  aria-label="Close chat"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {/* Messages area */}
            <Conversation className="chat-scrollbar">
              <ConversationContent className="gap-3 sm:gap-4">
              {messages.length === 0 ? (
                <div className="flex min-h-full flex-col items-center justify-center gap-3 px-3 text-center sm:gap-4 sm:px-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-accent-muted">
                    <MessageCircle className="size-6 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-text-primary">
                      Hi! I'm Gelo's AI assistant.
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Ask me anything about his services, tech stack, or
                      availability.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTIONS.map((s) => (
                      <Suggestion
                        key={s}
                        suggestion={s}
                        onClick={handleSend}
                        className="border-border bg-surface-alt text-xs text-text-secondary hover:border-accent/30 hover:bg-surface-alt hover:text-text-primary"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {messages.map((message, messageIndex) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex w-full',
                        message.role === 'user' ? 'justify-end' : 'justify-start',
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[90%] text-sm sm:max-w-[85%]',
                          message.role === 'user'
                            ? 'rounded-2xl rounded-br-md bg-surface-alt px-4 py-2.5 text-text-primary'
                            : 'text-text-primary',
                        )}
                      >
                        {message.parts.map((part, partIndex) => {
                          if (part.type === 'text') {
                            if (message.role === 'user') {
                              return (
                                <span key={`${message.id}-${partIndex}`}>
                                  {part.text}
                                </span>
                              )
                            }
                            const isLastAssistant =
                              messageIndex === messages.length - 1 &&
                              message.role === 'assistant'
                            return (
                              <StreamdownMemo
                                key={`${message.id}-${partIndex}`}
                                isAnimating={isStreaming && isLastAssistant}
                              >
                                {part.text}
                              </StreamdownMemo>
                            )
                          }
                          return null
                        })}
                      </div>
                    </div>
                  ))}
                  {error && (
                    <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                      <span className="flex-1">Something went wrong.</span>
                      <button
                        type="button"
                        onClick={() => regenerate()}
                        className="inline-flex items-center gap-1 font-medium underline underline-offset-2 hover:opacity-80"
                      >
                        <RotateCcw className="size-3" />
                        Retry
                      </button>
                    </div>
                  )}
                </div>
              )}
              </ConversationContent>
              <ConversationScrollButton className="bg-surface-alt text-text-secondary hover:bg-surface-alt hover:text-text-primary" />
            </Conversation>

            {/* Input area */}
            <div className="shrink-0 border-t border-border bg-surface p-2 sm:p-3">
              <form
                onSubmit={handleSubmit}
                className="flex items-end gap-2 rounded-xl border border-border bg-background p-2"
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Gelo's services..."
                  rows={1}
                  className="max-h-20 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-base text-text-primary outline-none placeholder:text-text-placeholder field-sizing-content sm:max-h-24 sm:text-sm"
                />
                {isLoading ? (
                  <Button
                    type="button"
                    size="icon"
                    onClick={stop}
                    className="size-8 shrink-0 bg-accent text-background hover:bg-accent/90"
                  >
                    {status === 'submitted' ? (
                      <Spinner className="size-4" />
                    ) : (
                      <Square className="size-3.5" />
                    )}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim()}
                    className="size-8 shrink-0 bg-accent text-background hover:bg-accent/90 disabled:opacity-30"
                  >
                    <ArrowUp className="size-4" />
                  </Button>
                )}
              </form>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
