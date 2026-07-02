export function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
}) {
  return (
    <article className={`notification-card ${notification.isRead ? "read" : ""}`}>
      <div className="card-topline">
        <span className="type-badge">{notification.notificationType}</span>
        <span className={notification.isRead ? "read-text" : "unread-text"}>
          {notification.isRead ? "Read" : "Unread"}
        </span>
      </div>

      <h3>{notification.title}</h3>
      <p>{notification.message}</p>

      <div className="card-meta">
        <span>Student: {notification.studentId}</span>
        <span>{new Date(notification.createdAt).toLocaleString()}</span>
      </div>

      <div className="card-actions">
        {!notification.isRead ? (
          <button type="button" onClick={() => onMarkAsRead(notification.id)}>
            Mark as Read
          </button>
        ) : null}
        <button
          type="button"
          className="secondary-button"
          onClick={() => onDelete(notification.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
