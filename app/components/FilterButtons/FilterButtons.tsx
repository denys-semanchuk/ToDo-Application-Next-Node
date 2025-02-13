"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterType, RootState } from '../../../types';
import { setFilter } from '../../store/slices/taskSlice';

export const FilterButtons = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);

  return (
    <div className="flex flex-wrap gap-2 justify-center my-2 sm:my-4">
      {Object.values(FilterType).map((filter) => (
        <button
          key={filter}
          onClick={() => dispatch(setFilter(filter))}
          className={`
            px-3 sm:px-4 
            py-1.5 sm:py-2 
            text-sm sm:text-base
            rounded-lg
            transition-colors
            duration-200
            ${currentFilter === filter
              ? 'bg-blue-500 text-white shadow-sm hover:bg-blue-600'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-400 
            focus:ring-opacity-50
          `}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};
