import { useEffect, useState } from "react";
import { fetchLogs, fetchNotifications } from "../api/notifications";

export function useNotifications(filters) {
  const [notifications, setNotifications] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const [notificationResponse, logResponse] = await Promise.all([
        fetchNotifications(filters),
        fetchLogs(),
      ]);

      setNotifications(notificationResponse.data || []);
      setLogs(logResponse.data || []);
    } catch (loadError) {
      setError(loadError.message || "Unable to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filters.filter, filters.search, filters.status]);

  return { notifications, logs, loading, error, refresh: load };
}
