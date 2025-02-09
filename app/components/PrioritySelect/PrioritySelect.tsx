import React from 'react';
import { Priority } from '../../../types';
import { useDispatch } from 'react-redux';
import { togglePriority } from 'store/thunks/taskThunks';
import { AppDispatch } from '../../../pages/login';

interface PrioritySelectProps {
  taskId: number;
  currentPriority: Priority;
}

export const PrioritySelect: React.FC<PrioritySelectProps> = ({ taskId, currentPriority }) => {
  const dispatch = useDispatch<AppDispatch>();

  const priorityColors = {
    [Priority.HIGH]: 'text-red-500',
    [Priority.MEDIUM]: 'text-yellow-500',
    [Priority.LOW]: 'text-gray-500'
  };

  const priorityIcons = {
    [Priority.HIGH]: '⚠',
    [Priority.MEDIUM]: '•',
    [Priority.LOW]: '○'
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value as Priority;
    dispatch(togglePriority({ _id: taskId, priority: newPriority }));
  };

  return (
    <div className="relative inline-block">
      <select 
        value={currentPriority}
        onChange={handlePriorityChange}
        className={`
          ${priorityColors[currentPriority]}
          appearance-none
          bg-transparent
          border border-gray-200
          rounded-md
          py-1 pl-2 pr-8
          cursor-pointer
          hover:border-gray-300
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          transition-colors
        `}
      >
        <option 
          value={Priority.HIGH}
          className="text-red-500 bg-white"
        >
          {priorityIcons[Priority.HIGH]} High
        </option>
        <option 
          value={Priority.MEDIUM}
          className="text-yellow-500 bg-white"
        >
          {priorityIcons[Priority.MEDIUM]} Medium
        </option>
        <option 
          value={Priority.LOW}
          className="text-gray-500 bg-white"
        >
          {priorityIcons[Priority.LOW]} Low
        </option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};