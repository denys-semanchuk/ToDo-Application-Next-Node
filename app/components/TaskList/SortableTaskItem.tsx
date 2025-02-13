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
      className="group mb-3 last:mb-0 list-none" 
      id={`task-${task._id}`}
    >
      <div ref={setNodeRef} style={style}>
        <div 
          className={`
            relative
            bg-white 
            rounded-lg 
            shadow-sm 
            hover:shadow-md 
            transition-all 
            duration-200
            p-3 sm:p-4
            ${task.important ? 'border-l-4 border-yellow-400' : 'border-l-4 border-transparent'}
          `}
        >
          {/* Top Row: Controls */}
          <div className="flex items-center gap-3 mb-2">
            <div
              {...attributes}
              {...listeners}
              className="hidden group-hover:flex items-center justify-center h-6 w-6 cursor-move hover:bg-gray-100 rounded touch-manipulation"
            >
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
              </svg>
            </div>

            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />

            <button
              onClick={() => dispatch(toggleImportant(task._id))}
              title={task.important ? 'Remove from important' : 'Add to important'}
              className={`flex-shrink-0 transition-colors duration-200 ${task.important ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </button>

            <PrioritySelect
              currentPriority={task.priority}
              taskId={task._id}
            />

            <button
              onClick={handleDelete}
              className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-full hover:bg-red-50 text-red-400 hover:text-red-600"
              aria-label="Delete task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Bottom Row: Text Area */}
          <div className="mt-1 pl-10">
            <AutoResizeTextArea
              value={taskText}
              onChange={handleTaskTextChange}
              className={`
                w-full 
                text-sm 
                sm:text-base 
                bg-transparent
                border-none
                resize-none
                ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}
                focus:outline-none 
                focus:ring-0
                min-h-[24px]
              `}
              maxLength={300}
            />
          </div>
        </div>
      </div>
    </li>
  );
};