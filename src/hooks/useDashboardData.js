import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { getAdminOrders, updateOrderStatus } from "../services/orderApi";
import { analyticsService } from "../services/analyticsService";
import { getItems } from "../services/menuService";
import api from "../services/api";

const ACTIVE_STATUSES = ["PLACED", "PREPARING", "READY"];

const isSameDay = (a, b) => new Date(a).toDateString() === new Date(b).toDateString();

export function useDashboardData() {
  const { profile } = useAuth();

  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAll = useCallback(async () => {
    try {
      setError("");

      const [ordersRes, tablesRes] = await Promise.all([
        getAdminOrders(),
        api.get("/restaurants/tables/"),
      ]);

      setOrders(ordersRes.data || []);
      setTables(tablesRes.data || []);

      // Popular items: best-effort, since it depends on the DynamoDB
      // analytics pipeline actually having events for this restaurant.
      if (profile?.restaurant_id) {
        try {
          const [dishesRes, itemsRes] = await Promise.all([
            analyticsService.getPopularDishes(profile.restaurant_id),
            getItems(),
          ]);

          const nameById = {};
          (itemsRes.data || []).forEach((item) => {
            nameById[item.id] = item.name;
          });

          const top = (dishesRes.data?.top_items || []).map((d) => ({
            id: d.item_id,
            name: nameById[d.item_id] || `Item #${d.item_id}`,
            orders: d.orders,
          }));

          setPopularItems(top);
        } catch {
          setPopularItems([]); // analytics pipeline not populated yet — fine
        }
      }
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
      setError("Couldn't load dashboard data. Pull to refresh.");
    } finally {
      setLoading(false);
    }
  }, [profile?.restaurant_id]);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 15000); // light polling for "live" feel
    return () => clearInterval(interval);
  }, [fetchAll]);

  const markOrderStatus = async (orderId, status) => {
    // optimistic update so the click feels instant
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    try {
      await updateOrderStatus(orderId, status);
    } finally {
      fetchAll();
    }
  };

  const todaysOrders = orders.filter((o) => isSameDay(o.created_at, new Date()));
  const pendingOrders = orders.filter((o) => ACTIVE_STATUSES.includes(o.status));
  const revenueToday = todaysOrders.reduce(
    (sum, o) => sum + Number(o.total_amount || 0),
    0
  );
  const occupiedTables = new Set(pendingOrders.map((o) => o.table_number));

  const trend = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      label: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      orders: orders.filter((o) => isSameDay(o.created_at, d)).length,
    };
  });

  return {
    loading,
    error,
    liveOrders: pendingOrders
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10),
    stats: {
      todaysOrdersCount: todaysOrders.length,
      revenueToday,
      pendingOrdersCount: pendingOrders.length,
      activeTables: occupiedTables.size,
      totalTables: tables.length,
    },
    popularItems,
    trend,
    markOrderStatus,
    refetch: fetchAll,
  };
}