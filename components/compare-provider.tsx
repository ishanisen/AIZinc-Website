"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  COMPARE_PARAM,
  MAX_COMPARE,
  labelFromSlug,
  parseCompareParam,
  serializeCompareParam,
} from "@/lib/compare";

export type CompareItem = {
  slug: string;
  name: string;
  logoUrl?: string;
};

type CompareContextValue = {
  items: CompareItem[];
  slugs: string[];
  addTool: (item: CompareItem) => boolean;
  removeTool: (slug: string) => void;
  clearAll: () => void;
  isSelected: (slug: string) => boolean;
  notice: string | null;
};

const CompareContext = createContext<CompareContextValue | null>(null);

function readSlugsFromUrl(): string[] {
  if (typeof window === "undefined") return [];
  return parseCompareParam(
    new URLSearchParams(window.location.search).get(COMPARE_PARAM),
  );
}

function writeCompareToUrl(slugs: string[]) {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const value = serializeCompareParam(slugs);

  if (value) {
    url.searchParams.set(COMPARE_PARAM, value);
  } else {
    url.searchParams.delete(COMPARE_PARAM);
  }

  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next === current) return;

  window.history.replaceState(window.history.state, "", next);
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [items, setItems] = useState<CompareItem[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const slugs = readSlugsFromUrl();
    setItems(
      slugs.map((slug) => ({
        slug,
        name: labelFromSlug(slug),
      })),
    );
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeCompareToUrl(items.map((item) => item.slug));
  }, [items, pathname, ready]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 2800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const addTool = useCallback((item: CompareItem) => {
    let added = true;

    setItems((current) => {
      const existing = current.find((entry) => entry.slug === item.slug);
      if (existing) {
        return current.map((entry) =>
          entry.slug === item.slug ? { ...entry, ...item } : entry,
        );
      }

      if (current.length >= MAX_COMPARE) {
        added = false;
        return current;
      }

      return [...current, item];
    });

    if (!added) {
      setNotice("Remove a tool to add another");
    }

    return added;
  }, []);

  const removeTool = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  const isSelected = useCallback(
    (slug: string) => items.some((item) => item.slug === slug),
    [items],
  );

  const value = useMemo<CompareContextValue>(
    () => ({
      items,
      slugs: items.map((item) => item.slug),
      addTool,
      removeTool,
      clearAll,
      isSelected,
      notice,
    }),
    [items, addTool, removeTool, clearAll, isSelected, notice],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within CompareProvider");
  }
  return context;
}
