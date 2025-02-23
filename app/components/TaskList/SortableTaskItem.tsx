"use client"
import React, { ChangeEvent, useRef, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../../types';
import { toggleImportant, deleteTask, toggleCompleted, updateTaskText } from '../../store/thunks/taskThunks'
import { useDispatch } from 'react-redux';
import { AutoResizeTextArea } from './../AutoResizeTextarea/AutoResizeTextArea';
import { PrioritySelect } from './../PrioritySelect/PrioritySelect';
import { AppDispatch } from '../../../pages/login';
import { useDebounce } from 'hooks/useDebounce';

interface Props {
  task: Task;
}

export const SortableTaskItem: React.FC<Props> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dispatch = useDispatch<AppDispatch>()
  const elementRef = useRef<HTMLLIElement>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    dispatch(toggleCompleted(task._id))
  }

  const [taskText, setTaskText] = useState(task.text);
  const debouncedTaskText = useDebounce(taskText, 1000);

  const handleTaskTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskText(e.target.value);
  };

  React.useEffect(() => {
    if (debouncedTaskText !== task.text) {
      dispatch(updateTaskText({ id: task._id, text: debouncedTaskText }));
    }
  }, [debouncedTaskText]);

  const handleDelete = () => {
    elementRef.current?.classList.add('task-exit')

    new Promise((resolve) => { setTimeout(resolve, 300) }).then(() => dispatch(deleteTask(task._id)))
  }

  return (
    <li 
      ref={elementRef} 
      className="group mb-2 list-none" 
      id={`task-${task._id}`}
    >
      <div ref={setNodeRef} style={style}>
        <div className={`
          flex items-start gap-1.5
          p-2 
          bg-white/80 backdrop-blur-sm
          rounded-lg
          border border-gray-100
          hover:border-gray-200
          shadow-sm
          hover:shadow
          transition-all duration-200
          ${task.completed ? 'bg-gray-50/80' : ''}
        `}>
          {/* Left Section - Checkbox */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-500 
                focus:ring-blue-400 focus:ring-offset-2"
            />
          </div>

          {/* Middle Section - Task Text */}
          <div className="flex-1 min-w-0 mx-1">
            <AutoResizeTextArea
              value={taskText}
              onChange={handleTaskTextChange}
              className={`
                w-full
                text-sm
                leading-normal
                bg-transparent
                border-none
                focus:ring-0
                resize-none
                overflow-hidden
                p-0
                ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}
              `}
              maxLength={300}
            />
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              {...attributes}
              {...listeners}
              className="touch-manipulation cursor-move p-1 hover:bg-gray-100 
                active:bg-gray-200 rounded transition-colors
                sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Drag to reorder task"
            >
              <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-8 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              </svg>
            </button>

            <button
              onClick={() => dispatch(toggleImportant(task._id))}
              className={`p-1 rounded transition-colors
                ${task.important 
                  ? 'text-amber-400 hover:bg-amber-50' 
                  : 'text-gray-400 hover:bg-gray-100'}`}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </button>

            <PrioritySelect
              currentPriority={task.priority}
              taskId={task._id}
            />

            <button
              onClick={handleDelete}
              className="p-1 rounded text-gray-400 hover:text-red-500 
                hover:bg-red-50 sm:opacity-0 sm:group-hover:opacity-100 transition-colors"
              aria-label="Delete task"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};