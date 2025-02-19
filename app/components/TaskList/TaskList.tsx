"use client"
import React from 'react'
import { FilterType, RootState } from '../../../types'
import { useSelector, useDispatch } from 'react-redux'
import { Notification } from '../Notification/Notification'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableTaskItem } from './SortableTaskItem';
import { reorderTasks } from 'store/slices/taskSlice';
import { ClearCompletedBtn } from 'components/ClearCompletedBtn/ClearCompletedBtn';
import { ProgressBar } from 'components/ProgressBar/ProgressBar';
import { AppDispatch } from '../../../pages/login'

export const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { tasks, filter, loading, error } = useSelector((state: RootState) => state.tasks);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (error) {
    return <Notification message={error} type="error" />;
  }

  if (!Array.isArray(tasks)) {
    return <Notification message="Invalid tasks data" type="error" />;
  }

  if (tasks.length === 0) {
    return <Notification message="No tasks yet" type="success" />;
  }
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case FilterType.ACTIVE:
        return !task.completed;
      case FilterType.COMPLETED:
        return task.completed;
      case FilterType.IMPORTANT:
        return task.important;
      default:
        return true;
    }
  });

  const completedTasks = tasks.filter(task => task.completed).length;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const oldIndex = filteredTasks.findIndex((task) => task._id === active.id);
      const newIndex = filteredTasks.findIndex((task) => task._id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedTasks = [...tasks];
        const oldGlobalIndex = tasks.findIndex(task => task._id === filteredTasks[oldIndex]._id);
        const newGlobalIndex = tasks.findIndex(task => task._id === filteredTasks[newIndex]._id);

        const [movedTask] = reorderedTasks.splice(oldGlobalIndex, 1);
        reorderedTasks.splice(newGlobalIndex, 0, movedTask);

        dispatch(reorderTasks(reorderedTasks));
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredTasks.map(task => task._id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          <ProgressBar completed={completedTasks} total={tasks.length} />
          {filteredTasks.map((task) => (
            <SortableTaskItem key={task._id} task={task} />
          ))}
        </div>
        <ClearCompletedBtn tasks={tasks} />
      </SortableContext>
    </DndContext>
  );
};