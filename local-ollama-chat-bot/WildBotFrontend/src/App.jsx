import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";

function TypewriterEffect({ text }) {
  // ... (TypewriterEffect component remains unchanged)
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    console.log("Messages state updated:", messages);
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { type: "user", text: input };
    setMessages((prevMessages) => {
      console.log("Messages after adding user message:", [
        ...prevMessages,
        userMessage,
      ]);
      return [...prevMessages, userMessage];
    });
    setInput("");
    setIsTyping(true);

    try {
      console.log("Sending request to:", "http://localhost:8080/api/chat");
      console.log("Request payload:", { message: input });

      const response = await axios.post(
        "http://localhost:8080/api/chat",
        {
          message: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response received:", response.data);

      if (response.data) {
        const botMessage = { type: "bot", text: response.data };
        setMessages((prevMessages) => {
          console.log("Messages after adding bot message:", [
            ...prevMessages,
            botMessage,
          ]);
          return [...prevMessages, botMessage];
        });
      } else {
        console.error("Unexpected response format:", response.data);
        const errorMessage = {
          type: "bot",
          text: "Received an unexpected response format.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error details:", error.message);
      }
      const errorMessage = {
        type: "bot",
        text: "Sorry, there was an error processing your request.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">WildBot Chat</div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-200">
              Home
            </a>
            <a href="#" className="hover:text-blue-200">
              About
            </a>
            <a href="#" className="hover:text-blue-200">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === "user" ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input form */}
      <form onSubmit={sendMessage} className="p-4 bg-white shadow-lg">
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 font-semibold hover:bg-blue-600 transition duration-200"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
