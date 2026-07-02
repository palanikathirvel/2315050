const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export function fetchNotifications(params = {}) {
  const query = new URLSearchParams();

  if (params.filter && params.filter !== "All") {
    query.set("type", params.filter);
  }

  if (params.search) {
    query.set("search", params.search);
  }

  if (params.status && params.status !== "all") {
    query.set("status", params.status);
  }

  return request(`/notifications?${query.toString()}`);
}

export function fetchLogs() {
  return request("/logs");
}

export function createNotification(payload) {
  return request("/notifications", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function markNotificationAsRead(id) {
  return request(`/notifications/${id}/read`, {
    method: "PATCH",
  });
}

export function deleteNotification(id) {
  return request(`/notifications/${id}`, {
    method: "DELETE",
  });
}
