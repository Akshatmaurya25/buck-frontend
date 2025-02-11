import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export const copyToClipboard = async (text: string | React.ReactElement): Promise<boolean> => {
  try {
    let textToCopy: string = typeof text === "string" ? text : renderToStaticMarkup(text);

    // Try using the modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);

    // Select and copy the text
    textArea.focus();
    textArea.select();
    document.execCommand("copy");

    // Clean up
    textArea.remove();
    return true;
  } catch (error) {
    console.error("Failed to copy text: ", error);
    return false;
  }
};


// Usage example:
// await copyToClipboard('Text to copy');