import React from 'react'
import { SortType } from '../../types';

interface SortButtonProps {
  onClick: () => void;
  title: string;
  icon: React.ReactNode;
  sortDirection?: SortType;
}

export const SortButton: React.FC<SortButtonProps> = ({ 
  onClick, 
  title, 
  icon, 
  sortDirection 
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        p-2 
        rounded-full
        text-gray-600
        hover:text-white
        hover:bg-blue-600 
        transition-all 
        duration-400 
        transform 
        hover:scale-110
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-400 
        focus:ring-opacity-50
        ${sortDirection === SortType.DESC ? 'rotate-180' : ''}
      `}
    >
      {icon}
    </button>
  )
}