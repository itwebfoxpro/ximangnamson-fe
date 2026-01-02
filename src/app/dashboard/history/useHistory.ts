"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { HistoryItem, Category } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.namsonjsc.vn";

function authHeaders(token: string | null) {
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export function useHistory() {
  const { user, token } = useAuth();

  const [items, setItems] = useState<HistoryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // =====================
  // FETCH
  // =====================
  async function fetchData() {
    if (!token) return;

    setLoading(true);
    try {
      const [hisRes, catRes] = await Promise.all([
        fetch(`${API_BASE}/api/dashboard`, {
          headers: authHeaders(token),
        }),
        fetch(`${API_BASE}/api/categories`),
      ]);

      const hisJson = await hisRes.json();
      const catJson = await catRes.json();

      const dashboardList = Array.isArray(hisJson)
        ? hisJson
        : hisJson.data || hisJson.DT || [];

      const categoryList = Array.isArray(catJson)
        ? catJson
        : catJson.data || catJson.DT || [];

      setItems(dashboardList);
      setCategories(categoryList);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // =====================
  // CREATE
  // =====================
  async function createItem(data: any) {
    if (!token) return;

    setSaving(true);
    try {
      await fetch(`${API_BASE}/api/dashboard`, {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(data),
      });
    } finally {
      setSaving(false);
    }
  }

  // =====================
  // UPDATE
  // =====================
  async function updateItem(id: number, data: any) {
    if (!token) return;

    setSaving(true);
    try {
      await fetch(`${API_BASE}/api/dashboard/${id}`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(data),
      });
    } finally {
      setSaving(false);
    }
  }

  // =====================
  // DELETE
  // =====================
  async function deleteItem(id: number) {
    if (!token) return;

    setSaving(true);
    try {
      await fetch(`${API_BASE}/api/dashboard/${id}`, {
        method: "DELETE",
        headers: authHeaders(token),
      });
    } finally {
      setSaving(false);
    }
  }

  // =====================
  // EFFECT
  // =====================
  useEffect(() => {
    // ⛔ LOGOUT → CLEAR DATA
    if (!user || !token) {
      setItems([]);
      setCategories([]);
      setLoading(false);
      return;
    }

    // 🔥 LOGIN / SWITCH USER
    setItems([]);
    fetchData();
  }, [user?.username, token]);

  return {
    items,
    categories,
    loading,
    saving,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
  };
}
