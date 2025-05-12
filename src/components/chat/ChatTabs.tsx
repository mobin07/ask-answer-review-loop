
import React from "react";

export type TabType = "BLOCK NO" | "TAB2";

interface ChatTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const ChatTabs: React.FC<ChatTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <>
      {/* Navigation tabs */}
      <div className="bg-white border-b">
        <div className="max-w-screen-xl mx-auto flex">
          <div 
            className={`px-6 py-3 cursor-pointer ${activeTab === "BLOCK NO" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("BLOCK NO")}
          >
            INCOMING
          </div>
          <div 
            className={`px-6 py-3 cursor-pointer ${activeTab === "TAB2" ? "border-b-2 border-blue-500" : "text-gray-500"}`}
          >
            OUTGOING
          </div>
          <div 
            className={`px-6 py-3 cursor-pointer text-gray-500`}
          >
            HEALTH CHECK
          </div>
          <div 
            className={`px-6 py-3 cursor-pointer text-gray-500`}
          >
            TROUBLESHOOT
          </div>
          <div 
            className={`px-6 py-3 cursor-pointer border-b-2 border-blue-500 text-blue-500 font-medium`}
          >
            CUSTOMER CASES
          </div>
        </div>
      </div>

      {/* Sub tabs */}
      <div className="bg-white border-b">
        <div className="max-w-screen-xl mx-auto flex">
          <div 
            className={`px-6 py-3 cursor-pointer border-b-2 ${activeTab === "BLOCK NO" ? "border-pink-500 text-pink-500 font-medium" : "border-transparent"}`}
            onClick={() => setActiveTab("BLOCK NO")}
          >
            BLOCK NO
          </div>
          <div 
            className={`px-6 py-3 cursor-pointer border-b-2 ${activeTab === "TAB2" ? "border-pink-500 text-pink-500 font-medium" : "border-transparent"}`}
            onClick={() => setActiveTab("TAB2")}
          >
            TAB2
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatTabs;
