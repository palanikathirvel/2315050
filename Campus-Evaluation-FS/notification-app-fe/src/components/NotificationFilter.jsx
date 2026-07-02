const filters = ["All", "General", "Placement", "Result", "Event"];

export function NotificationFilter({ value, onChange }) {
  return (
    <div className="filter-group">
      {filters.map((type) => (
        <button
          key={type}
          type="button"
          className={value === type ? "filter-chip active" : "filter-chip"}
          onClick={() => onChange(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
