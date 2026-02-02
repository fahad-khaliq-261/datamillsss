// ============================================
// USE CASES HOOK
// Custom hook for managing use cases in components
// ============================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { UseCase, UseCaseFormData, Notification } from "@/types";
import {
  getUseCasesByIndustry,
  createUseCase,
  updateUseCase,
  deleteUseCase,
} from "@/services/supabase";

interface UseUseCasesReturn {
  // State
  useCases: UseCase[];
  isLoading: boolean;
  error: string | null;
  notification: Notification | null;

  // Actions
  loadUseCases: () => Promise<void>;
  addUseCase: (formData: UseCaseFormData) => Promise<boolean>;
  editUseCase: (id: string, formData: UseCaseFormData) => Promise<boolean>;
  removeUseCase: (id: string) => Promise<boolean>;
  clearNotification: () => void;
}

/**
 * useUseCases - Hook for managing use cases for a specific industry
 *
 * @param industry - Industry slug (e.g., "healthcare")
 * @returns State and actions for use case management
 *
 * @example
 * const { useCases, isLoading, addUseCase } = useUseCases("healthcare");
 */
export function useUseCases(industry: string): UseUseCasesReturn {
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  // Show notification with auto-dismiss
  const showNotification = useCallback(
    (type: "success" | "error", message: string) => {
      setNotification({ type, message });
      setTimeout(() => setNotification(null), 4000);
    },
    []
  );

  // Load use cases from Supabase
  const loadUseCases = useCallback(async () => {
    if (!industry) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getUseCasesByIndustry(industry);
      setUseCases(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load use cases";
      setError(message);
      showNotification("error", message);
    } finally {
      setIsLoading(false);
    }
  }, [industry, showNotification]);

  // Load on mount and when industry changes
  useEffect(() => {
    if (industry) {
      loadUseCases();
    }
  }, [industry, loadUseCases]);

  // Add new use case
  const addUseCase = useCallback(
    async (formData: UseCaseFormData): Promise<boolean> => {
      setIsLoading(true);
      try {
        await createUseCase(industry, formData);
        showNotification("success", "Use case created successfully!");
        await loadUseCases();
        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to create use case";
        showNotification("error", message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [industry, loadUseCases, showNotification]
  );

  // Edit existing use case
  const editUseCase = useCallback(
    async (id: string, formData: UseCaseFormData): Promise<boolean> => {
      setIsLoading(true);
      try {
        await updateUseCase(id, formData);
        showNotification("success", "Use case updated successfully!");
        await loadUseCases();
        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to update use case";
        showNotification("error", message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [loadUseCases, showNotification]
  );

  // Delete use case
  const removeUseCase = useCallback(
    async (id: string): Promise<boolean> => {
      setIsLoading(true);
      try {
        await deleteUseCase(id);
        showNotification("success", "Use case deleted successfully!");
        await loadUseCases();
        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to delete use case";
        showNotification("error", message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [loadUseCases, showNotification]
  );

  // Clear notification manually
  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    useCases,
    isLoading,
    error,
    notification,
    loadUseCases,
    addUseCase,
    editUseCase,
    removeUseCase,
    clearNotification,
  };
}

