import React, { useState } from 'react';
import "./App.css";

function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const queryParams = new URLSearchParams({ question }).toString();
    const response = await fetch(`https://generative-ai-server.onrender.com/api/content?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    const data = await response.json();
    setResult(data.result);
  }
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Google Generative AI</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Ask Your Question</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                Enter your prompt:
              </label>
              <input
                id="question"
                type="text"
                placeholder="Enter a prompt here"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate
            </button>
          </form>
          {result && (
            <div className="p-4 mt-4 bg-gray-50 rounded-md shadow-inner">
              <h3 className="text-lg font-semibold text-gray-800">Result:</h3>
              <p className="mt-2 text-gray-700">{result}</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
        Created by <strong>Subrat Prakash ❤️</strong>
        </div>
      </footer>
    </div>
  );
}

export default App;

