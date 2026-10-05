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
  const [paymentSummary, setPaymentSummary] = useState<any>(null);
  const [profitByCategory, setProfitByCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [monthlyCategory, setMonthlyCategory] = useState<any[]>([]);

  // =====================
  // FETCH PAYMENT SUMMARY
  // =====================
  async function fetchPaymentSummary() {
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/api/dashboard/payment-summary`, {
        headers: authHeaders(token),
      });
      const data = await res.json();
      setPaymentSummary(data);
    } catch (e: any) {
      console.error("Lỗi lấy tổng thanh toán:", e.message);
    }
  }
  async function fetchMonthlyCategory(month: number, year: number) {
    if (!token) return;

    try {
      const res = await fetch(
        `${API_BASE}/api/dashboard/stats/monthly-category?month=${month}&year=${year}`,
        { headers: authHeaders(token) },
      );
      const data = await res.json();
      setMonthlyCategory(data);
    } catch (e: any) {
      console.error("Lỗi lấy thống kê theo loại xi măng:", e.message);
    }
  }

  // =====================
  // FETCH DATA
  // =====================
  async function fetchProfitByCategory(month: number, year: number) {
    if (!token) return;

    try {
      const res = await fetch(
        `${API_BASE}/api/dashboard/stats/profit-category?month=${month}&year=${year}`,
        { headers: authHeaders(token) },
      );
      const data = await res.json();

      const normalized = data.map((i: any) => ({
        ...i,
        profit: Number(i.profit) || 0, // phòng trường hợp null
        ori_price: i.ori_price ?? 0, // nếu backend trả kèm ori_price
      }));

      setProfitByCategory(normalized);
    } catch (e: any) {
      console.error("Lỗi lấy lợi nhuận theo danh mục:", e.message);
    }
  }
  
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
      await fetchData();
      await fetchPaymentSummary();
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
      await fetchData();
      await fetchPaymentSummary();
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
      await fetchData();
      await fetchPaymentSummary();
    } finally {
      setSaving(false);
    }
  }

  // =====================
  // EFFECT
  // =====================
  useEffect(() => {
    if (!user || !token) {
      setItems([]);
      setCategories([]);
      setPaymentSummary(null);
      setLoading(false);
      return;
    }

    setItems([]);
    fetchData();
    fetchPaymentSummary();
  }, [user?.username, token]);

  return {
    items,
    categories,
    paymentSummary,
    profitByCategory,
    monthlyCategory,
    loading,
    saving,
    error,
    fetchData,
    fetchPaymentSummary,
    fetchMonthlyCategory,
    fetchProfitByCategory,
    createItem,
    updateItem,
    deleteItem,
  };
}
