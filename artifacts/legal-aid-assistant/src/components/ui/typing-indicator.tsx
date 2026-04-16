import React from 'react';
import { motion } from 'framer-motion';

export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1 p-4 bg-muted text-muted-foreground rounded-2xl rounded-tl-sm w-fit max-w-[80%] my-2">
      <motion.div
        className="w-2 h-2 rounded-full bg-foreground/40"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-foreground/40"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-foreground/40"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
    </div>
  );
}