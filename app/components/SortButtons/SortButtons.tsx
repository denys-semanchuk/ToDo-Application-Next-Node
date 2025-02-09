import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortingByTime, sortByPriority } from '../../store/slices/taskSlice';
import { RootState } from '../../../types';
import { SortButton } from '../SortButton/SortButton';
import { FaClock, FaListOl } from 'react-icons/fa';

export const SortButtons: React.FC = () => {
  const dispatch = useDispatch();
  const { timeSort, prioritySort } = useSelector((state: RootState) => state.tasks);

  return (
    <div className="flex gap-2">
      <SortButton
        onClick={() => dispatch(setSortingByTime())}
        title="Sort by Date"
        sortDirection={timeSort}
        icon={<FaClock className="h-5 w-5" />}
      />
      <SortButton
        onClick={() => dispatch(sortByPriority())}
        title="Sort by Priority"
        sortDirection={prioritySort}
        icon={<FaListOl className="h-5 w-5" />}
      />
    </div>
  );
};