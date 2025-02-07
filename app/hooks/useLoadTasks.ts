import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "store/thunks/taskThunks";
import { AppDispatch } from "../../pages/login";

export const useLoadTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await dispatch(fetchTasks()).unwrap();
      } catch (err) {
        setError(err as string);
      }
    };
    loadTasks();
  }, []);

  return {
    error,
    setError
  };
};
