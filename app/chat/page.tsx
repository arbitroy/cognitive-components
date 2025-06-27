'use client'
import { useSimpleAI } from "@/hooks/useSimpleAI";
import { useState } from "react";
import Header from "../components/Header";

export default function ChatPage() {
  const { generate, ready } = useSimpleAI();
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generate(input);
    setText(result);
    setLoading(false);
  };

  if (!ready) {
    return <div>Loading AI model...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header title="Cognitive Components" />
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg">
        <h1 className="text-xl font-bold mb-4">Simple AI Text Generator</h1>
        <textarea
          className="w-full p-3 border rounded-lg resize-none mb-4"
          rows={3}
          placeholder="Type your prompt here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={handleGenerate}
          disabled={!input.trim() || loading}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 mb-4"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        {text && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600 mb-2">Generated:</p>
            <p className="text-gray-800 whitespace-pre-line">{text}</p>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-4">
          ✨ Running DistilGPT-2 entirely in your browser!
        </p>
      </div>
    </div>
  );
}