// src/hooks/useIsSamePage.ts
import { useLocation } from "react-router-dom";
import { useRef } from "react";

export function useIsSamePage() {
  const location = useLocation();
  const initialPath = useRef(location.pathname);

  // Returns true if still on the same route as when hook mounted
  const isSamePage = () => location.pathname === initialPath.current;

  return isSamePage;
}
