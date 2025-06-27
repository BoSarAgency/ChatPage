import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { chatConfig } from "./config";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [threadId] = useState(
    () => `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    // If this is the first message, add the initial assistant message and set hasStartedChat
    if (!hasStartedChat) {
      const initialMessage = {
        id: 1,
        role: "assistant",
        content: chatConfig.initialMessage,
        timestamp: new Date(),
      };
      setMessages([initialMessage, userMessage]);
      setHasStartedChat(true);
    } else {
      setMessages((prev) => [...prev, userMessage]);
    }

    setInputValue("");
    setIsLoading(true);

    // Add loading message
    const loadingMessage = {
      id: Date.now() + 1,
      role: "assistant",
      content: "",
      isLoading: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await fetch(chatConfig.apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId: threadId,
          content: userMessage.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Replace loading message with actual response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? {
                ...msg,
                content: data.content,
                isLoading: false,
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      // Replace loading message with error message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? {
                ...msg,
                content: "Sorry, I encountered an error. Please try again.",
                isLoading: false,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const LoadingDots = () => (
    <div className="loading-dots">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );

  if (!hasStartedChat) {
    // Initial welcome screen - centered
    return (
      <div className="welcome-container">
        <div className="welcome-content">
          <h1 className="welcome-title">What can I help with?</h1>
          <div className="welcome-input-wrapper">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              disabled={isLoading}
              rows={1}
              className="welcome-input"
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="welcome-send-button"
              style={{ color: chatConfig.color }}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Chat view with max-width container
  return (
    <div className="chat-container">
      <div className="chat-content">
        <div className="messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.role}`}
              style={{
                backgroundColor:
                  message.role === "user"
                    ? chatConfig.userMessageBgColor
                    : chatConfig.assistantMessageBgColor,
                color:
                  message.role === "user"
                    ? chatConfig.userMessageTextColor
                    : chatConfig.assistantMessageTextColor,
              }}
            >
              <div className="message-content">
                {message.isLoading ? (
                  <LoadingDots />
                ) : (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              disabled={isLoading}
              rows={1}
              className="message-input"
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="send-button"
              style={{ color: chatConfig.color }}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
