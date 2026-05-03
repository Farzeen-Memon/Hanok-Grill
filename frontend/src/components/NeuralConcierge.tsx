import React, { useState, useEffect, useRef } from 'react';
import './NeuralConcierge.css';

interface Message {
    role: 'agent' | 'user';
    content: string;
    timestamp: Date;
}

const NeuralConcierge: React.FC = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ messages, setMessages ] = useState<Message[]>([
        {
            role: 'agent',
            content: "Welcome to Hanok Grill. I am your Neural Concierge. How may I assist your culinary journey today?",
            timestamp: new Date()
        }
    ]);
    const [ input, setInput ] = useState('');
    const [ isTyping, setIsTyping ] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [ messages, isTyping ]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [ ...prev, userMsg ]);
        setInput('');
        setIsTyping(true);

        // Simulate AI Processing
        setTimeout(async () => {
            let response = "";
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('recommend') || lowerInput.includes('suggest') || lowerInput.includes('hungry')) {
                response = "I can certainly help with that. Based on our current menu, would you prefer something spicy like our Tteokbokki, or perhaps a savory grilled dish like Bulgogi?";
            } else if (lowerInput.includes('spicy')) {
                response = "For spicy enthusiasts, I highly recommend our Kimchi Jjigae or the Tteokbokki. They feature authentic Korean heat.";
            } else if (lowerInput.includes('veg')) {
                response = "Our Japchae features sweet potato glass noodles and vibrant vegetables. It is a favorite among our vegetarian guests.";
            } else if (lowerInput.includes('reservation') || lowerInput.includes('book')) {
                response = "You can book a table by clicking the 'Book Table' button in the header. Our evening slots are filling up fast.";
            } else {
                response = "I am processing your request. Most of our guests find our Bulgogi Ribeye to be an excellent starting point for a first visit.";
            }

            const agentMsg: Message = {
                role: 'agent',
                content: response,
                timestamp: new Date()
            };

            setMessages(prev => [ ...prev, agentMsg ]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    className="concierge-toggle"
                    onClick={() => setIsOpen(true)}
                >
                    <div className="concierge-icon-rings">
                        <div className="ring"></div>
                        <div className="ring"></div>
                    </div>
                    <span className="material-symbols-outlined">auto_awesome</span>
                    <span className="toggle-label">AI Concierge</span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="concierge-window">
                    <div className="concierge-header">
                        <div className="concierge-header-info">
                    <span className="material-symbols-outlined concierge-header-icon">auto_awesome</span>
                            <div>
                                <h3>Neural Concierge</h3>
                                <p>Online | AI-Powered Assistance</p>
                            </div>
                        </div>
                        <button className="concierge-close" onClick={() => setIsOpen(false)}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="concierge-messages" ref={scrollRef}>
                        {messages.map((m, i) => (
                            <div key={i} className={`message-bubble ${m.role}`}>
                                <p>{m.content}</p>
                                <span className="message-time">
                                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message-bubble agent typing">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                        )}
                    </div>

                    <div className="concierge-input-area">
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend}>
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default NeuralConcierge;
