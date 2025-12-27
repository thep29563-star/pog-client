"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { hideToast } from "../../store/toastSlice";
import "./Toast.css";

export default function Toast() {
  const dispatch = useDispatch();
  const { open, message, severity, time } = useSelector(
    (state: RootState) => state.toast
  );

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, time || 5000);

      return () => clearTimeout(timer);
    }
  }, [open, time, dispatch]);

  if (!open) return null;

  return (
    <div className={`toast-container toast-${severity}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {severity === "success" ? (
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          ) : (
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          )}
        </span>
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={() => dispatch(hideToast())}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
