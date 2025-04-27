// src/components/ui/card.jsx
import React from 'react';

export const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white dark:bg-gray-800 shadow-md rounded-md p-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="mb-2 text-xl font-semibold">
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h3 className="text-lg font-bold">{children}</h3>
);

export const CardContent = ({ children }) => (
  <div className="text-sm text-gray-700 dark:text-gray-300">
    {children}
  </div>
);
