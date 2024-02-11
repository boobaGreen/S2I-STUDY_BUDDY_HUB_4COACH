import { useNavigate } from "react-router-dom";

export function useMoveBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}

// custom hook to manage the "move back" button
