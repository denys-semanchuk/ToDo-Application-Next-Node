import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "store/thunks/taskThunks";
import { AppDispatch } from "../../pages/login";
import { RootState } from "../../types";

export const useLoadTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (isAuthenticated === false) return;
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
    setError,
  };
};
