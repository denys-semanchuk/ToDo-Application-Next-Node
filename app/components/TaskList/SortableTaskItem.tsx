"use client"
import React, { ChangeEvent, useRef, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../types';
import { toggleImportant, deleteTask, toggleCompleted, updateTaskText } from '../../store/thunks/taskThunks'
import { setPriority } from '../../store/slices/taskSlice';
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
    <li ref={elementRef} className="border-b border-gray-200 last:border-none list-none" id={`task-${task._id}`}>
      <div ref={setNodeRef} style={style} className="list-none">
        <div className={`p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${task.important ? 'border-l-4 border-yellow-400' : ''}}`}>
          <div className="flex items-center">
            <div
              {...attributes}
              {...listeners}
              className="mr-2 px-2 cursor-move hover:bg-gray-100 rounded"
            >
              ⋮⋮
            </div>
            <button
              onClick={() => dispatch(toggleImportant(task._id))}
              title='add to important'
              className={`mr-2 text-xl ${task.important ? 'text-yellow-400' : 'text-gray-400'}`}
            >


              ★
            </button>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <PrioritySelect
                  priority={task.priority}
                  onChange={(priority) =>
                    dispatch(setPriority({ _id: task._id, priority }))
                  }
                />
                <label className="flex items-center space-x-3 w-full">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleChange}
                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                  />
                  <AutoResizeTextArea
                    value={taskText}
                    onChange={handleTaskTextChange}
                    className={`w-full ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2`}
                    maxLength={300}
                  />
                </label>

                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};