import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { Loader2, Code, MessageSquare, Edit3 } from "lucide-react";

const App = () => {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' or 'review'

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/ai/get-review/`,
        { code }
      );
      console.log("Response:", response.data);
      if (response.data.success) {
        setReview(response.data.response);
        if (isMobile) setActiveTab("review");
      }
    } catch (error) {
      console.error("Error fetching review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-4 md:p-5 flex flex-col md:flex-row gap-4">
      {/* Mobile Tabs */}
      {isMobile && (
        <div className="flex bg-gray-700 rounded-lg shadow-lg p-1 mb-2">
          <button
            className={`flex items-center justify-center flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === "editor"
                ? "bg-blue-600 text-white font-medium shadow-md"
                : "text-gray-300 bg-gray-800"
            }`}
            onClick={() => setActiveTab("editor")}
          >
            <Code size={18} className="mr-2" />
            Editor
          </button>
          <button
            className={`flex items-center justify-center flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === "review"
                ? "bg-blue-600 text-white font-medium shadow-md"
                : "text-gray-300 bg-gray-800"
            }`}
            onClick={() => review && setActiveTab("review")}
            disabled={!review}
          >
            <MessageSquare size={18} className="mr-2" />
            Feedback
          </button>
        </div>
      )}

      {/* Left Editor Panel */}
      <div
        className={`bg-gray-900 rounded-2xl shadow-xl p-4 flex flex-col ${
          isMobile
            ? activeTab === "editor"
              ? "flex flex-col h-[70vh]"
              : "hidden"
            : "flex-1"
        }`}
      >
        <h2 className="text-white font-bold mb-3 text-lg md:text-xl flex items-center gap-2">
          <Edit3 size={20} />
          Write Your Code
        </h2>
        
        {/* Editor container with proper scrolling */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 overflow-auto rounded-lg border border-gray-700">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={12}
              style={{
                fontFamily: "Fira Code, monospace",
                fontSize: 14,
                color: "white",
                minHeight: "100%",
              }}
              textareaClassName="h-full"
              preClassName="h-full overflow-auto"
            />
          </div>
        </div>
        
        <div className="mt-4 md:absolute md:bottom-8 md:right-10 md:mt-0">
          <Button
            onClick={handleSubmit}
            disabled={isLoading || code.trim() === ""}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg w-full md:w-auto transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Reviewing...
              </>
            ) : (
              "Review Code"
            )}
          </Button>
        </div>
      </div>

      {/* Right Panel */}
      <div
        className={`rounded-2xl shadow-xl p-4 md:p-5 ${
          isMobile
            ? activeTab === "review"
              ? "flex flex-col h-[70vh]"
              : "hidden"
            : "flex-1 flex flex-col min-h-0"
        } bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700`}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
            <MessageSquare size={20} />
            AI Feedback
          </h2>
          {isMobile && review && (
            <button
              onClick={() => setActiveTab("editor")}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              Edit Code
            </button>
          )}
        </div>
        
        {/* Scrollable content container */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="prose prose-invert prose-sm max-w-none text-gray-200">
              {review ? (
                <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
              ) : (
                <div className="text-gray-400 italic text-center py-8 h-full flex flex-col items-center justify-center">
                  <MessageSquare size={48} className="text-gray-600 mb-3" />
                  <p className="text-lg">
                    {isLoading
                      ? "Generating review..."
                      : "Submit your code to get AI feedback"}
                  </p>
                  {!isLoading && (
                    <p className="text-sm mt-2 text-gray-500">
                      Your code review will appear here
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;