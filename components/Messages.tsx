import React, { useState } from 'react';
import { Search, Send, Quote, Phone, Video, MoreHorizontal, CheckCheck, ChevronLeft, PlusSquare, FileText, MessageSquare } from 'lucide-react';
import { Contact, Message } from '../types';

const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Amira Ahmed', lastMessage: 'The new logo looks amazing!', time: '10:45 AM', unread: 2 },
  { id: '2', name: 'Zayaan Ibrahim', lastMessage: 'Can we hop on a quick call?', time: 'Yesterday' },
  { id: '3', name: 'Island Getaways', lastMessage: 'Payment has been initiated.', time: 'Monday' },
  { id: '4', name: 'Creative Labs', lastMessage: 'Waiting for your proposal.', time: 'Aug 12' },
];

const MOCK_MESSAGES: Message[] = [
  { id: 'm1', sender: 'Amira Ahmed', content: 'Hi Jauzaf, did you finish the logo concepts?', timestamp: '09:30 AM', isMe: false },
  { id: 'm2', sender: 'Me', content: 'Yes, I just uploaded them to the pipeline. Let me know what you think!', timestamp: '09:45 AM', isMe: true },
  { id: 'm3', sender: 'Amira Ahmed', content: 'The new logo looks amazing!', timestamp: '10:45 AM', isMe: false },
];

const Messages: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(MOCK_CONTACTS[0]);
  const [showListOnMobile, setShowListOnMobile] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowListOnMobile(false);
  };

  return (
    <div className="h-full flex border border-[#E2E8F0] dark:border-dark-border rounded-xl overflow-hidden animate-in fade-in duration-500 bg-white dark:bg-dark transition-colors">
      {/* Contact List Pane */}
      <div className={`
        ${showListOnMobile ? 'flex' : 'hidden'} md:flex
        w-full md:w-[300px] lg:w-[350px] bg-[#F9FAFB] dark:bg-dark-surface border-r border-[#E2E8F0] dark:border-dark-border flex-col shrink-0
      `}>
        <div className="p-4 border-b border-[#E2E8F0] dark:border-dark-border bg-white dark:bg-dark flex items-center justify-between">
          <h2 className="font-bold text-[14px] dark:text-white">Inbox</h2>
        </div>
        <div className="p-3 bg-white dark:bg-dark">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-9 pr-3 py-1.5 border border-[#E2E8F0] dark:border-dark-border rounded-md bg-[#F9FAFB] dark:bg-dark-surface text-[11px] focus:bg-white dark:focus:bg-dark transition-colors dark:text-white"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {MOCK_CONTACTS.map((contact) => (
            <div 
              key={contact.id}
              onClick={() => handleContactClick(contact)}
              className={`p-4 border-b border-[#E2E8F0] dark:border-dark-border cursor-pointer transition-all ${
                selectedContact?.id === contact.id ? 'bg-white dark:bg-dark shadow-[inset_3px_0_0_0_#0047FF]' : 'hover:bg-brand/5'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[13px] ${contact.unread ? 'font-bold text-brand' : 'font-medium text-gray-700 dark:text-gray-300'}`}>
                  {contact.name}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{contact.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-[11px] truncate flex-1 pr-2 ${contact.unread ? 'text-brand font-bold' : 'text-gray-400 dark:text-gray-500'}`}>
                  {contact.lastMessage}
                </p>
                {contact.unread && (
                  <span className="bg-brand text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ring-4 ring-white dark:ring-dark shadow-sm">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation Pane */}
      <div className={`
        ${!showListOnMobile ? 'flex' : 'hidden'} md:flex
        flex-1 flex-col bg-white dark:bg-dark min-w-0
      `}>
        {selectedContact ? (
          <>
            <div className="px-4 md:px-6 h-[60px] border-b border-[#E2E8F0] dark:border-dark-border flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowListOnMobile(true)} className="md:hidden p-1.5 -ml-1 text-gray-400 hover:text-brand transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center font-bold text-white text-[10px]">
                  {selectedContact.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold leading-none text-[13px] dark:text-white">{selectedContact.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <button className="hover:text-brand transition-colors"><Phone className="w-4 h-4" /></button>
                <button className="hover:text-brand transition-colors"><Video className="w-4 h-4" /></button>
                <button className="hover:text-brand transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 no-scrollbar bg-white dark:bg-dark">
              {MOCK_MESSAGES.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] md:max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div 
                      className={`px-4 py-2 rounded-xl text-[12px] md:text-[13px] leading-relaxed ${
                        msg.isMe 
                        ? 'bg-brand text-white rounded-br-none shadow-lg shadow-brand/10' 
                        : 'bg-[#F3F4F6] dark:bg-dark-surface text-brand dark:text-gray-200 rounded-bl-none border border-[#E2E8F0] dark:border-dark-border font-medium'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <div className="flex items-center gap-1.5 px-1">
                       <span className="text-[9px] text-gray-400 font-bold uppercase">{msg.timestamp}</span>
                       {msg.isMe && <CheckCheck className="w-3 h-3 text-brand" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-[#E2E8F0] dark:border-dark-border bg-white dark:bg-dark transition-colors">
              <div className="flex gap-2 mb-3">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-brand/5 border border-brand/20 rounded-md text-[10px] font-bold uppercase tracking-wider text-brand hover:bg-brand/10 transition-all">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Send Quote</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-md text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-brand transition-all">
                  <PlusSquare className="w-3.5 h-3.5" />
                  <span>Milestone</span>
                </button>
              </div>
              <div className="flex items-end gap-2 p-2 border border-[#E2E8F0] dark:border-dark-border rounded-lg focus-within:border-brand transition-all bg-[#F9FAFB] dark:bg-dark-surface focus-within:bg-white dark:focus-within:bg-dark">
                <button className="p-1.5 text-gray-400 hover:text-brand rounded">
                  <Quote className="w-4 h-4" />
                </button>
                <textarea 
                  rows={1}
                  placeholder="Message..."
                  className="flex-1 py-1.5 resize-none bg-transparent outline-none text-[13px] placeholder:text-gray-400 dark:text-white"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button 
                  disabled={!inputValue.trim()}
                  className={`p-2 rounded-md transition-all ${
                    inputValue.trim() ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'bg-gray-100 dark:bg-dark-border text-gray-300'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-4">
            <div className="w-16 h-16 bg-brand/5 border border-brand/10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-brand opacity-20" />
            </div>
            <p className="text-[13px] font-bold tracking-widest uppercase opacity-40">Select a dialogue</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;