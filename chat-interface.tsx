"use client";
import * as React from "react";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "./logo.png";
interface Message {
  role: "agent" | "user";
  content: string | React.ReactElement;
  timestamp: string;
}
import runagent from "./game/src/index";
import axios from "axios";
import { copyToClipboard } from "./lib/utils";
import { useAccount } from "wagmi";
import { getAccount } from "./app/landing-page";
import { executeResponse } from "./functions/executeResponse";

export const outerMessage: Message[] = [];
export let sendMessageGlobal: ((message: string) => void) | null = null;

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content:
        "Hello, I am a Buck Terminal. Connect your wallet and let's get started",
      timestamp: "4:08:28 PM",
    },
  ]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTemplates, setShowTemplates] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // executeResponse({
  //   execute: true,
  //   functionName: "transfertokenSEI",
  //   args: { to: "0xE81032A865Dd45BF39E8430f72b9FA8f2e2Cb030", value: 0.2 },
  // });
  // Function to scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const sendMessage = (message: string | React.ReactElement, role?: string) => {
    if (typeof message == "string" && !message.trim()) return;
    const newMessage: Message = {
      role: role === "agent" ? "agent" : "user",
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    scrollToBottom();
  };

  const executeTask = async (task: string) => {
    try {
      const response = await axios.post("/api", task, {
        headers: {
          "Content-Type": "application/json",
          address: account.address,
        },
      });
      const res = JSON.parse(response.data.data);
      if (response.data.success) {
        if (res.execute) {
          sendMessage("Confirm transaction from your wallet", "agent");
        } else {
          sendMessage(res.message, "agent");
        }

        if (res.execute) {
          const string = await executeResponse(res);
          sendMessage(string, "agent");
        }
        setLoading(false);
      }
      console.log("Response:", response);
    } catch (err) {
      console.error("Error", err);
    }
  };
  useEffect(() => {
    sendMessageGlobal = sendMessage; // Assign sendMessage function globally
    outerMessage.length = 0;
    outerMessage.push(...messages);
    console.log(outerMessage);
  }, [messages]);
  const handleSend = (input: string) => {
    if (!input.trim()) return;
    setHasInteracted(true);
    setShowTemplates(false); // Hide templates after interaction
    sendMessage(input, "user");
    executeTask(input);
    setInput("");
    setLoading(true);
  };
  const account = useAccount();

  // Template buttons component
  const TemplateButtons = () => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
      {[
        {
          title: "Get your Wallet Balance",
          desc: "Check your current wallet balance",
          query: "Get wallet balance",
        },
        {
          title: "Transfer your Tokens",
          desc: "Send tokens securely",
          query: "Transfer tokens",
        },
        {
          title: "Get Tweets",
          desc: "View latest crypto updates",
          query: "Get tweets",
        },
        {
          title: "Know About Crypto",
          desc: "Learn blockchain basics",
          query: "Tell me about cryptocurrency",
        },
      ].map((item, i) => (
        <Button
          key={i}
          className="h-24 bg-[#3C2322] text-[#F1E9E9] hover:bg-[#3C2322]/90 flex flex-col items-center justify-center p-4 rounded-xl transition-all"
          onClick={() => handleSend(item.query)}
        >
          <span className="text-sm font-medium text-center">{item.title}</span>
          <span className="text-xs text-[#9E9E9E] mt-2 text-center">
            {item.desc}
          </span>
        </Button>
      ))}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-[#141414] overflow-auto text-[#F1E9E9]">
      {/* Center container for messages and input */}
      <div
        className={cn(
          "flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 transition-all duration-300",
          showTemplates ? "justify-center mt-[-2rem]" : "justify-end"
        )}
      >
        {/* Messages container */}
        <ScrollArea
          className={cn(
            "w-full flex-1 transition-all duration-300",
            showTemplates ? "mb-4 max-h-[50vh]" : "max-h-[80vh]"
          )}
        >
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-2 max-w-[80%]",
                  message.role === "user"
                    ? "ml-auto justify-end mr-7"
                    : "justify-start"
                )}
              >
                {message.role === "agent" && (
                  // <div className="h-8 w-8 rounded-full bg-[#3C2322] flex-shrink-0" />
                  <div className="rounded-full h-fit overflow-hidden">
                    <Image src={logo} width={30} className="" alt="" />
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {message.role === "agent" ? "Buck" : "You"}
                    </span>
                    <span className="text-sm text-[#F1E9E9]">
                      {message.timestamp}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      message.role === "user" ? "bg-[#2E2E2E]" : "bg-[#3C2322]"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                  {message.role === "agent" && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#F1E9E9] hover:bg-[#2E2E2E]"
                        onClick={() => copyToClipboard(message.content)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#F1E9E9] hover:bg-[#2E2E2E]"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#F1E9E9] hover:bg-[#2E2E2E]"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#F1E9E9] hover:bg-[#2E2E2E]"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <>
                <div className="flex gap-2">
                  <div className="rounded-full h-fit w-fit flex gap-2  overflow-hidden">
                    <Image src={logo} width={30} className="" alt="" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium">Buck</span>
                    <span className="text-xs text-yellow-400 font-medium">
                      Wait for response
                    </span>
                  </div>
                  <div className="flex items-center gap-2"></div>
                </div>
                <div
                  className={cn(
                    "p-3 rounded-lg mx-9 max-w-[45%]",
                    "bg-[#3C2322]"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    <div role="status" className="max-w-sm animate-pulse">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </p>
                </div>
              </>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Input and template section */}
        <div className="w-full space-y-3">
          {/* Input box */}
          <div className="flex gap-2 w-full">
            <Textarea
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[52px] max-h-32 bg-[#2E2E2E] text-[#F1E9E9] border-[#3C2322] rounded-xl flex-1"
            />
            <Button
              className="px-6 bg-[#3C2322] text-[#F1E9E9] hover:bg-[#2E2E2E] rounded-xl"
              onClick={() => handleSend(input)}
            >
              Send
            </Button>
          </div>

          {/* Template buttons - only show if not interacted */}
          {showTemplates && (
            <div className="flex justify-center w-full mt-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl">
                {[
                  {
                    title: "Wallet Balance",
                    desc: "Check balance",
                    query: "Get wallet balance",
                  },
                  {
                    title: "Transfer Tokens",
                    desc: "Send tokens",
                    query: "Transfer tokens",
                  },
                  {
                    title: "Get Tweets",
                    desc: "Crypto updates",
                    query: "Get tweets",
                  },
                  {
                    title: "About Crypto",
                    desc: "Learn basics",
                    query: "Tell me about cryptocurrency",
                  },
                ].map((item, i) => (
                  <Button
                    key={i}
                    className="h-16 bg-[#3C2322] text-[#F1E9E9] hover:bg-[#3C2322]/90 flex flex-col items-center justify-center p-2 rounded-xl transition-all"
                    onClick={() => handleSend(item.query)}
                  >
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-xs text-[#9E9E9E]">{item.desc}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
