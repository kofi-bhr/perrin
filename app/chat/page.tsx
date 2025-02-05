'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import io from 'socket.io-client'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export default function ChatRoom() {
  const [messages, setMessages] = useState<any[]>([])
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState<any>(null)
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string>('')

  useEffect(() => {
    // Check if user is logged in
    const email = localStorage.getItem('userEmail')
    if (email !== 'employee@perrin.org') {
      router.push('/auth/signin')
      return
    }
    setUserEmail(email)

    // Connect to Socket.IO
    const newSocket = io(API_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true
    })
    setSocket(newSocket)

    // Join chat
    newSocket.emit('join', { email })

    // Listen for chat history
    newSocket.on('chatHistory', (history: any[]) => {
      setMessages(history)
    })

    // Listen for new messages
    newSocket.on('message', (msg: any) => {
      setMessages(prev => [...prev, msg])
    })

    // Listen for user list updates
    newSocket.on('userList', (users: string[]) => {
      setOnlineUsers(users)
    })

    return () => {
      newSocket.close()
    }
  }, [router])

  // Update scroll behavior to use the chat container
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && socket) {
      socket.emit('message', message)
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 pt-24">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Employee Chat Room</h1>
        <div className="grid grid-cols-4 gap-6">
          {/* Online Users Sidebar */}
          <div className="col-span-1 bg-white rounded-lg shadow-sm h-[700px]">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">Online Users</h2>
              <p className="text-sm text-gray-500 mt-1">{onlineUsers.length} active now</p>
            </div>
            <div className="p-4 space-y-3">
              {onlineUsers.map((user, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{user[0]?.toUpperCase()}</span>
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{user}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-3 bg-white rounded-lg shadow-sm h-[700px] flex flex-col">
            {/* Messages - Add ref to the container */}
            <div 
              ref={chatContainerRef}
              className="flex-1 p-6 overflow-y-auto scroll-smooth"
            >
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.user === userEmail ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${msg.user === userEmail ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-4 py-2`}>
                      {msg.user !== userEmail && (
                        <div className="text-xs font-medium text-blue-600 mb-1">{msg.user}</div>
                      )}
                      <p className="text-sm">{msg.text}</p>
                      <div className={`text-xs mt-1 ${msg.user === userEmail ? 'text-blue-100' : 'text-gray-500'}`}>
                        {new Date(msg.time).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input - Fixed at bottom */}
            <div className="border-t bg-gray-50">
              <form onSubmit={sendMessage} className="flex gap-2 p-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 