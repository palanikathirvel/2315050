import { useMemo, useState } from "react";
import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import {
  createNotification,
  deleteNotification,
  markNotificationAsRead,
} from "../api/notifications";
import { useNotifications } from "../hooks/useNotifications";

const initialForm = {
  studentId: "",
  title: "",
  message: "",
  notificationType: "General",
};

export function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const { notifications, logs, loading, error, refresh } = useNotifications({
    filter,
    search,
    status,
  });

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.isRead).length,
    [notifications]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await createNotification(form);
      setForm(initialForm);
      await refresh();
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead(id);
    await refresh();
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    await refresh();
  };

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Campus Evaluation</p>
          <h1>Notification Center</h1>
          <p className="hero-copy">
            Simple in-memory notification management with request logging
            middleware and live log visibility.
          </p>
        </div>
        <div className="hero-stat">
          <span>Unread</span>
          <strong>{unreadCount}</strong>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <h2>Create Notification</h2>
          <form className="notification-form" onSubmit={handleSubmit}>
            <input
              placeholder="Student ID"
              value={form.studentId}
              onChange={(event) =>
                setForm({ ...form, studentId: event.target.value })
              }
              required
            />
            <input
              placeholder="Title"
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
              required
            />
            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(event) =>
                setForm({ ...form, message: event.target.value })
              }
              required
              rows="4"
            />
            <select
              value={form.notificationType}
              onChange={(event) =>
                setForm({ ...form, notificationType: event.target.value })
              }
            >
              <option value="General">General</option>
              <option value="Placement">Placement</option>
              <option value="Result">Result</option>
              <option value="Event">Event</option>
            </select>
            <button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Create Notification"}
            </button>
          </form>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Notifications</h2>
              <p>{notifications.length} item(s)</p>
            </div>
            <button type="button" className="secondary-button" onClick={refresh}>
              Refresh
            </button>
          </div>

          <div className="toolbar">
            <NotificationFilter value={filter} onChange={setFilter} />
            <input
              className="search-input"
              placeholder="Search title, message or student ID"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="all">All Status</option>
              <option value="read">Read</option>
              <option value="unread">Unread</option>
            </select>
          </div>

          {loading ? <p className="state-text">Loading notifications...</p> : null}
          {error ? <p className="state-text error-text">{error}</p> : null}
          {!loading && !notifications.length ? (
            <p className="state-text">No notifications found.</p>
          ) : null}

          <div className="card-list">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Middleware Logs</h2>
            <p>Latest request and response entries from the backend.</p>
          </div>
        </div>

        {!logs.length ? <p className="state-text">No logs captured yet.</p> : null}

        <div className="log-list">
          {logs.map((log) => (
            <article key={log.id} className="log-item">
              <div className="log-topline">
                <span className={`pill pill-${log.level.toLowerCase()}`}>
                  {log.level}
                </span>
                <strong>{log.component}</strong>
                <time>{new Date(log.timestamp).toLocaleString()}</time>
              </div>
              <p>{log.message}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
