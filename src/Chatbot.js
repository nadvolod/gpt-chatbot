import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleUserInput = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async () => {
        if (!userInput.trim()) return; // Prevent sending empty messages
    
        setChatHistory(currentHistory => [...currentHistory, { message: userInput, type: 'user' }]);
        setUserInput('');
    
        try {
            console.log(userInput);
            const response = await axios.post('http://localhost:3001/chat', { message: userInput });
            setChatHistory(currentHistory => [...currentHistory, { message: response.data.message, type: 'bot' }]);
        } catch (error) {
            console.error('Error sending message: ', error);
            setChatHistory(currentHistory => [...currentHistory, { message: 'Error communicating with the chat service.', type: 'bot' }]);
        }
    };
    

    return (
        <div>
            <div>
                {chatHistory.map((msg, index) => (
                    <div key={index} className={msg.type}>
                        {msg.message}
                    </div>
                ))}
            </div>
            <input value={userInput} onChange={handleUserInput} />
            <button onClick={handleSubmit}>Send</button>
        </div>
    );
}

export default Chatbot;
