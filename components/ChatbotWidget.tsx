'use client'

import { useState } from 'react'
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi'

interface ChatMessage {
  id: number
  from: 'user' | 'bot'
  text: string
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      from: 'bot',
      text: 'Assalam-o-Alaikum! Main Ecolight ka assistant hoon. Lights, prices ya delivery ke bare mein kuch bhi poochhain 😊',
    },
  ])

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    const nextId = messages.length ? messages[messages.length - 1].id + 1 : 1
    const userMessage: ChatMessage = { id: nextId, from: 'user', text: trimmed }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    const reply: ChatMessage = {
      id: nextId + 1,
      from: 'bot',
      text:
        'Shukriya! Aap ka message mil gaya. Filhaal yeh demo chatbot hai, asal WhatsApp / live chat ke liye owner se connect kar dein.',
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, reply])
    }, 600)
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-black text-white">
            <div>
              <p className="font-semibold text-sm">Ecolight Chatbot</p>
              <p className="text-xs text-gray-200">Online • Reply demo only</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10"
              aria-label="Close chat"
            >
              <FiX size={16} />
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto px-4 py-3 space-y-2 bg-gray-50 dark:bg-gray-800">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.from === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    msg.from === 'user'
                      ? 'bg-black text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex items-center border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Apna sawal likhein..."
              className="flex-1 bg-transparent text-sm px-2 py-1 outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
            <button
              type="submit"
              className="ml-1 p-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
              aria-label="Send message"
            >
              <FiSend size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 rounded-full shadow-xl bg-black text-white hover:bg-gray-800 transition"
        aria-label="Open chat"
      >
        <FiMessageCircle size={20} />
        <span className="hidden sm:inline text-sm font-medium">Chat with us</span>
      </button>
    </div>
  )
}


