'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import io from 'socket.io-client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiUser } from 'react-icons/fi'
import { useAuth } from '@/lib/hooks/useAuth'

interface Profile {
  name: string
  image: string | null
}

interface OnlineUser {
  email: string
  profile?: Profile
}

interface Message {
  user: string
  text: string
  time: string
  profile?: Profile
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://perrin-production.up.railway.app'

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState<any>(null)
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { isAuthenticated, userEmail } = useAuth()

  useEffect(() => {
    if (isAuthenticated && userEmail) {
      // Get profile from localStorage
      const profileData = localStorage.getItem('employeeProfile')
      const profile = profileData ? JSON.parse(profileData) : null
      
      console.log('Connecting with profile:', profile) // Debug log

      const newSocket = io(API_URL, {
        transports: ['websocket', 'polling'],
        withCredentials: true
      })
      setSocket(newSocket)

      // Join with complete profile data
      newSocket.emit('join', { 
        email: userEmail,
        profile: profile // Make sure profile is being sent
      })

      // Listen for chat history
      newSocket.on('chatHistory', (history: Message[]) => {
        setMessages(history)
      })

      // Listen for new messages
      newSocket.on('message', (msg: Message) => {
        setMessages(prev => [...prev, msg])
      })

      // Listen for user list updates
      newSocket.on('userList', (users: OnlineUser[]) => {
        setOnlineUsers(users)
      })

      return () => {
        newSocket.close()
      }
    }
  }, [isAuthenticated, userEmail])

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

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 relative"
        >
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">
              Employee Chat Room
            </h1>
            <p className="text-blue-400/80">Connect with your colleagues in real-time</p>
          </div>
          <div className="bg-blue-500/10 px-6 py-3 rounded-2xl backdrop-blur-sm border border-blue-500/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-blue-300 font-medium">
                {onlineUsers.length} {onlineUsers.length === 1 ? 'Member' : 'Members'} Online
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-4 gap-8 relative">
          {/* Online Users Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-1 bg-white/5 backdrop-blur-xl rounded-3xl h-[700px] border border-white/10 
              shadow-2xl shadow-black/20"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Online Users</h2>
              <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <span className="text-blue-400 text-sm font-medium">{onlineUsers.length}</span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {onlineUsers.map((user, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all 
                    hover:shadow-lg hover:shadow-black/20"
                >
                  <div className="relative">
                    {user.profile?.image ? (
                      <div className="w-10 h-10 rounded-xl overflow-hidden">
                        <Image
                          src={user.profile.image}
                          alt={user.profile.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl 
                        flex items-center justify-center shadow-lg shadow-blue-500/20 rotate-3 hover:rotate-0 
                        transition-transform"
                      >
                        <span className="text-white font-bold">
                          {user.profile?.name?.[0] || user.email?.[0] || 'E'}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full 
                      border-2 border-gray-900 animate-pulse"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    {user.profile?.name || 'Employee'}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Chat Area */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-3 bg-white/5 backdrop-blur-xl rounded-3xl h-[700px] flex flex-col 
              border border-white/10 shadow-2xl shadow-black/20"
          >
            <div 
              ref={chatContainerRef}
              className="flex-1 p-6 overflow-y-auto scroll-smooth space-y-4 custom-scrollbar"
            >
              {messages.map((msg, i) => {
                const isCurrentUser = msg.user === localStorage.getItem('userEmail')
                const prevMsg = i > 0 ? messages[i - 1] : null
                const isNewSender = !prevMsg || prevMsg.user !== msg.user
                const timeGap = prevMsg && 
                  new Date(msg.time).getTime() - new Date(prevMsg.time).getTime() > 300000

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}
                  >
                    {(isNewSender || timeGap) && (
                      <div className="flex items-center gap-2 mb-1 px-2">
                        {msg.profile?.image ? (
                          <div className="relative w-6 h-6 rounded-full overflow-hidden">
                            <Image
                              src={msg.profile.image}
                              alt={msg.profile.name || msg.user}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                            <FiUser className="w-3 h-3 text-gray-300" />
                          </div>
                        )}
                        <div className="text-xs font-medium text-gray-400">
                          {msg.profile?.name || (msg.user === userEmail ? 'You' : 'Employee')}
                        </div>
                      </div>
                    )}

                    <div className={`max-w-[70%] ${
                      isCurrentUser 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                        : 'bg-white/10 text-gray-100'
                    } rounded-2xl px-6 py-4 shadow-xl`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div className={`text-xs mt-2 ${
                        isCurrentUser ? 'text-blue-200/80' : 'text-gray-400'
                      }`}>
                        {new Date(msg.time).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-white/10 bg-white/5 p-6 rounded-b-3xl">
              <form onSubmit={sendMessage} className="flex gap-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-white/10 border-0 rounded-xl px-6 py-4 text-white placeholder-gray-400 
                    focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-inner shadow-black/20"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 
                    text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 
                    hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent 
          animate-gradient-slow" />
      </div>

      <style jsx global>{`
        @keyframes gradient-slow {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-1%, -1%) rotate(0.5deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }
        .animate-gradient-slow {
          animation: gradient-slow 8s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  )
} 