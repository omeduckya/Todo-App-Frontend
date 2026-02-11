export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      className={`theme-toggle ${theme === "dark" ? "is-dark" : ""}`}
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="theme-icon theme-icon-sun" aria-hidden="true">
        {"\u2600"}
      </span>
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" />
      </span>
      <span className="theme-icon theme-icon-moon" aria-hidden="true">
        {"\u263e"}
      </span>
    </button>
  );
}
