// import { useState, useRef, useEffect } from "react";

// const CustomerChatbot = ({ restaurantId }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "Hi 👋 Ask me anything about the menu!",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const messagesEndRef = useRef(null);

//   const toggleChat = () => setIsOpen(!isOpen);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:8080/chatbot/ask", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           restaurant_id: restaurantId,
//           question: input,
//         }),
//       });

//       const data = await res.json();

//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: data.answer || "No response" },
//       ]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "⚠️ Something went wrong." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   return (
//     <>
//       {/* FLOATING BUTTON */}
//       <button
//         onClick={toggleChat}
//         className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl"
//       >
//         🤖
//       </button>

//       {/* CHAT PANEL */}
//       {isOpen && (
//         <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col h-[70vh] max-h-[600px]">

//           {/* HEADER */}
//           <div className="bg-emerald-500 text-white p-4 rounded-t-2xl flex justify-between items-center">
//             <span className="font-semibold">Menu Assistant</span>
//             <button onClick={toggleChat}>✕</button>
//           </div>

//           {/* MESSAGES */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`flex ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`px-4 py-2 rounded-xl max-w-[80%] text-sm ${
//                     msg.sender === "user"
//                       ? "bg-emerald-500 text-white"
//                       : "bg-white border"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}

//             {loading && (
//               <div className="text-sm text-gray-500">Typing...</div>
//             )}

//             <div ref={messagesEndRef} />
//           </div>

//           {/* INPUT */}
//           <div className="p-3 border-t flex gap-2">
//             <input
//               type="text"
//               placeholder="Ask about dishes..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyPress}
//               className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
//             />

//             <button
//               onClick={sendMessage}
//               disabled={loading}
//               className="bg-emerald-500 text-white px-4 rounded-lg hover:bg-emerald-600 disabled:opacity-50"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CustomerChatbot;


import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const CustomerChatbot = ({ restaurantId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 Ask me anything about the menu!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/chatbot/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurant_id: restaurantId,
          question: input,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.answer || "No response" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={toggleChat}
        className={`
          fixed bottom-6 right-6 z-50 
          w-16 h-16 rounded-full 
          bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600
          hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700
          shadow-2xl shadow-emerald-500/50
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
          group
          ${isOpen ? 'rotate-0' : 'animate-bounce'}
        `}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
        )}
        
        {/* Pulse Animation Ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
        )}
      </button>

      {/* CHAT PANEL */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-10rem)] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
          {/* HEADER with Gradient */}
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 p-5 flex items-center justify-between">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
            </div>

            {/* Header Content */}
            <div className="relative flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Menu Assistant</h3>
                <p className="text-emerald-300 text-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>

            <button
              onClick={toggleChat}
              className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } animate-fadeIn`}
              >
                <div
                  className={`
                    max-w-[80%] px-4 py-3 rounded-2xl shadow-md
                    ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-br-sm"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                    }
                  `}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading Animation */}
            {loading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl rounded-bl-sm shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
                    </div>
                    <span className="text-sm text-gray-500">Typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about the menu..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  transition-all duration-200
                  ${
                    loading || !input.trim()
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95"
                  }
                `}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* Custom Scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </>
  );
};

export default CustomerChatbot;