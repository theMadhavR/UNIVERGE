import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';
import api from '../utils/api';
import { 
  MessageCircle, 
  Send, 
  Users, 
  Search,
  MoreVertical,
  Menu,
  Info,
  Paperclip,
  Smile,
  Clock,
  Check,
  CheckCheck
} from 'lucide-react';

const Chat = () => {
  const { userProfile, currentUser } = useAuth();
  const { socket, isConnected, emit, on, off } = useSocket();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [blockedContacts, setBlockedContacts] = useState(() => {
    const saved = localStorage.getItem('blocked_contacts');
    return saved ? JSON.parse(saved) : [];
  });
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Mock chat data loading
    setLoading(true);
    setTimeout(() => {
      const mockChats = [
        {
          chat_id: 'chat_1',
          participants: ['user_1', 'user_2'],
          last_message: {
            content: 'Thanks for the advice about the internship!',
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            sender_id: 'user_2'
          },
          unread_count: 0,
          other_participant: {
            user_id: 'user_2',
            display_name: 'Sarah Johnson',
            user_type: 'alumni'
          }
        },
        {
          chat_id: 'chat_2',
          participants: ['user_1', 'user_3'],
          last_message: {
            content: 'Looking forward to our meeting tomorrow',
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            sender_id: 'user_3'
          },
          unread_count: 2,
          other_participant: {
            user_id: 'user_3',
            display_name: 'Mike Chen',
            user_type: 'alumni'
          }
        },
        {
          chat_id: 'chat_3',
          participants: ['user_1', 'user_4'],
          last_message: {
            content: 'The career path you suggested was really helpful',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            sender_id: 'user_1'
          },
          unread_count: 0,
          other_participant: {
            user_id: 'user_4',
            display_name: 'Dr. Emily Davis',
            user_type: 'alumni'
          }
        }
      ];
      setChats(mockChats);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (socket && isConnected) {
      // Set up mock message listeners
      on('new_message', handleNewMessage);
      
      return () => {
        off('new_message', handleNewMessage);
      };
    }
  }, [socket, isConnected]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewMessage = (data) => {
    if (data.chat_id === activeChat?.chat_id) {
      setMessages(prev => [...prev, data.message]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const selectChat = (chat) => {
    setActiveChat(chat);
    // Load mock messages for the selected chat
    const mockMessages = [
      {
        message_id: 'msg_1',
        chat_id: chat.chat_id,
        sender_id: chat.other_participant.user_id,
        content: `Hi there! I saw we have similar backgrounds. I'd love to help you with your career journey.`,
        message_type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        read: true
      },
      {
        message_id: 'msg_2',
        chat_id: chat.chat_id,
        sender_id: currentUser?.uid || 'user_1',
        content: `Thank you for connecting! I really appreciate you reaching out. I have some questions about breaking into the tech industry.`,
        message_type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
        read: true
      },
      {
        message_id: 'msg_3',
        chat_id: chat.chat_id,
        sender_id: chat.other_participant.user_id,
        content: `Of course! I was in your shoes a few years ago. What specific areas are you interested in?`,
        message_type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
        read: true
      },
      {
        message_id: 'msg_4',
        chat_id: chat.chat_id,
        sender_id: currentUser?.uid || 'user_1',
        content: `I'm particularly interested in software engineering roles. Any advice on building a strong portfolio?`,
        message_type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 21).toISOString(),
        read: true
      },
      {
        message_id: 'msg_5',
        chat_id: chat.chat_id,
        sender_id: chat.other_participant.user_id,
        content: `Great question! Focus on building 2-3 substantial projects that solve real problems. Also, contribute to open source - it looks fantastic on a resume.`,
        message_type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        read: true
      },
      {
        message_id: 'msg_6',
        chat_id: chat.chat_id,
        sender_id: currentUser?.uid || 'user_1',
        content: `That makes sense. Do you think participating in hackathons would be beneficial too?`,
        message_type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 19).toISOString(),
        read: true
      },
      {
        message_id: 'msg_7',
        chat_id: chat.chat_id,
        sender_id: chat.other_participant.user_id,
        content: `Absolutely! Hackathons are excellent for learning under pressure and networking. I actually got my first internship through a hackathon connection.`,
        message_type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        read: true
      },
      {
        message_id: 'msg_8',
        chat_id: chat.chat_id,
        sender_id: chat.other_participant.user_id,
        content: chat.last_message?.content || 'Thanks for the advice about the internship!',
        message_type: 'text',
        timestamp: chat.last_message?.timestamp || new Date().toISOString(),
        read: true
      }
    ];
    setMessages(mockMessages);

    // Mark as read
    if (chat.unread_count > 0) {
      setChats(prev => prev.map(c => 
        c.chat_id === chat.chat_id ? { ...c, unread_count: 0 } : c
      ));
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const message = {
      message_id: 'msg_' + Date.now(),
      chat_id: activeChat.chat_id,
      sender_id: currentUser?.uid || 'user_1',
      content: newMessage.trim(),
      message_type: 'text',
      timestamp: new Date().toISOString(),
      read: false
    };

    // Add message immediately for instant feedback
    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate sending via socket
    emit('send_message', {
      chat_id: activeChat.chat_id,
      sender_id: currentUser?.uid || 'user_1',
      content: newMessage.trim(),
      message_type: 'text'
    });

    // Update last message in chats list
    setChats(prev => prev.map(chat => 
      chat.chat_id === activeChat.chat_id 
        ? { 
            ...chat, 
            last_message: message,
            last_activity: new Date().toISOString()
          } 
        : chat
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await api.get(`/api/users/search?q=${encodeURIComponent(searchTerm)}`);
        setSearchSuggestions(response.data);
      } catch (err) {
        console.error("Error fetching user search suggestions:", err);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSelectSuggestion = (selectedUser) => {
    setSearchTerm('');
    setSearchSuggestions([]);

    const existingChat = chats.find(c => c.other_participant?.user_id === selectedUser.id);
    if (existingChat) {
      selectChat(existingChat);
      return;
    }

    const newChat = {
      chat_id: 'chat_new_' + Date.now(),
      participants: [currentUser?.uid || 'user_1', selectedUser.id],
      last_message: null,
      unread_count: 0,
      other_participant: {
        user_id: selectedUser.id,
        display_name: `${selectedUser.first_name} ${selectedUser.last_name}`,
        email: selectedUser.email,
        user_type: selectedUser.user_type
      }
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat);
    setMessages([]);
  };

  const isBlocked = (userId) => blockedContacts.includes(userId);

  const handleToggleBlock = () => {
    setMenuOpen(false);
    const otherId = activeChat?.other_participant?.user_id;
    if (!otherId) return;
    setBlockedContacts(prev => {
      const updated = prev.includes(otherId) 
        ? prev.filter(id => id !== otherId) 
        : [...prev, otherId];
      localStorage.setItem('blocked_contacts', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearChat = () => {
    setMenuOpen(false);
    setMessages([]);
    setChats(prev => prev.map(c => 
      c.chat_id === activeChat?.chat_id 
        ? { ...c, last_message: null } 
        : c
    ));
  };

  const handleDeleteContact = () => {
    setMenuOpen(false);
    setChats(prev => prev.filter(c => c.chat_id !== activeChat?.chat_id));
    setActiveChat(null);
  };

  const filteredChats = chats.filter(chat => 
    chat.other_participant?.display_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 1000 * 60 * 60 * 24) {
      // Today
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diff < 1000 * 60 * 60 * 24 * 7) {
      // This week
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      // Older
      return date.toLocaleDateString('en-US', { 
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading your conversations...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-200px)] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar - Chat List */}
        <div className="w-80 border-r border-gray-200 dark:border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Messages
            </h2>
            
            {/* Search */}
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Gmail ID or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              {/* Autocomplete Search Suggestions Dropdown */}
              {searchSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchSuggestions.map(user => (
                    <div
                      key={user.id}
                      onClick={() => handleSelectSuggestion(user)}
                      className="p-3 border-b border-gray-100 dark:border-slate-800 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <span className={`text-xs ml-2 px-2 py-0.5 rounded-full shrink-0 font-medium ${
                        user.user_type === 'alumni' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {user.user_type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.length > 0 ? (
              filteredChats.map(chat => (
                <div
                  key={chat.chat_id}
                  onClick={() => selectChat(chat)}
                  className={`p-4 border-b border-gray-100 dark:border-slate-800 cursor-pointer transition-colors ${
                    activeChat?.chat_id === chat.chat_id 
                      ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/40' 
                      : 'hover:bg-gray-50 dark:hover:bg-slate-850/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {chat.other_participant?.display_name || 'Unknown User'}
                        </h3>
                        {chat.last_message && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(chat.last_message.timestamp)}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                        {chat.last_message?.content || 'No messages yet'}
                      </p>
                    </div>

                    {chat.unread_count > 0 && (
                      <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread_count}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-650 mx-auto mb-3" />
                <p className="text-gray-550 dark:text-gray-400 text-sm">
                  {chats.length === 0 
                    ? 'No conversations yet. Connect with alumni to start chatting.'
                    : 'No conversations match your search.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {activeChat.other_participant?.display_name || 'Unknown User'}
                    </h3>
                    <p className="text-sm text-gray-550 dark:text-gray-400 capitalize">
                      {activeChat.other_participant?.user_type || 'user'} • {isConnected ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg focus:outline-none"
                    aria-label="Chat options"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                  
                  {/* Hamburger Menu Dropdown */}
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50 py-1 text-sm">
                      <button
                        onClick={handleToggleBlock}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200"
                      >
                        {isBlocked(activeChat.other_participant.user_id) ? 'Unblock Contact' : 'Block Contact'}
                      </button>
                      <button
                        onClick={handleClearChat}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200"
                      >
                        Clear Chat
                      </button>
                      <button
                        onClick={handleDeleteContact}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 text-red-650 dark:text-red-400 font-medium"
                      >
                        Delete Contact
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length > 0 ? (
                  messages.map((message) => {
                    const isOwnMessage = message.sender_id === (currentUser?.uid || 'user_1');
                    
                    return (
                      <div
                        key={message.message_id}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="max-w-xs lg:max-w-md">
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isOwnMessage
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <div className={`flex items-center mt-1 text-xs ${
                            isOwnMessage ? 'justify-end text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-505'
                          }`}>
                            <span>{formatMessageTime(message.timestamp)}</span>
                            {isOwnMessage && (
                              <span className="ml-2">
                                {message.read ? (
                                  <CheckCheck className="h-3 w-3 text-blue-500 inline" />
                                ) : (
                                  <Check className="h-3 w-3 text-gray-400 dark:text-gray-505 inline" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-650 mx-auto mb-3" />
                    <p className="text-gray-550 dark:text-gray-400 text-sm">
                      No messages yet. Start the conversation!
                    </p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-slate-800">
                <div className="flex space-x-2">
                  {isBlocked(activeChat.other_participant.user_id) ? (
                    <div className="flex-1 py-2 text-center text-sm bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30 rounded-lg">
                      This contact is blocked. Unblock from the menu to send messages.
                    </div>
                  ) : (
                    <>
                      <button className="p-2 text-gray-400 hover:text-blue-655 dark:hover:text-blue-400 transition-colors">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-655 dark:hover:text-blue-400 transition-colors">
                        <Smile className="h-5 w-5" />
                      </button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-300 dark:text-gray-650 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Chat Selected</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Select a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;