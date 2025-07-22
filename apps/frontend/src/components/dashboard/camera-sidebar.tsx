import { Search, MessageCircle } from "lucide-react";
import { useState } from "react";

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isDelivered?: boolean;
  isReceived?: boolean;
  hasNewSnap?: boolean;
  snapCount?: number;
}

const mockContacts: ChatContact[] = [
  {
    id: "2",
    name: "Batman",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    lastMessage: "Delivered",
    timestamp: "43m",
    isDelivered: true,
  },
  {
    id: "3",
    name: "Tom Cruise",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
    lastMessage: "Received",
    timestamp: "58m",
    isReceived: true,
  },
  {
    id: "4",
    name: "Paul Allen",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
    lastMessage: "Say Hi!",
    timestamp: "",
    hasNewSnap: false,
  },
  {
    id: "5",
    name: "Scott Stiener",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&crop=face",
    lastMessage: "Received",
    timestamp: "2h • 3 🔥⭐",
    snapCount: 3,
    isReceived: true,
  },
];

export function ChatSidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-sidebar-dark h-screen flex flex-col border-r border-sidebar-darker">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-darker">
        {/* Search and My AI */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sidebar-text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-sidebar-darker text-sidebar-text pl-10 pr-4 py-2 rounded-full text-sm placeholder:text-sidebar-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center gap-3 p-4 hover:bg-sidebar-darker/50 cursor-pointer transition-colors"
          >
            {/* Avatar */}
            <div className="relative">
              <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
              {contact.hasNewSnap && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">📷</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sidebar-text truncate">{contact.name}</h3>
                {contact.timestamp && <span className="text-xs text-sidebar-text-muted">{contact.timestamp}</span>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {contact.isDelivered && <span className="text-xs text-blue-400">▶</span>}
                  {contact.isReceived && <span className="text-xs text-red-400">📷</span>}
                  <span className="text-sm text-sidebar-text-muted truncate">{contact.lastMessage}</span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-1">
                  <button className="w-6 h-6 rounded-full bg-sidebar-darker flex items-center justify-center hover:bg-muted transition-colors">
                    <MessageCircle className="w-3 h-3 text-sidebar-text-muted" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
