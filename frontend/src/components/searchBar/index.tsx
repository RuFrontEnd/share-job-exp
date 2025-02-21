export default function SearchBar() {
  return (
    <div className="input-group max-w-sm">
      <span className="input-group-text">
        <span className="icon-[tabler--search] text-base-content/80 size-6"></span>
      </span>
      <input
        type="search"
        className="input input-lg grow"
        placeholder="Search"
        id="kbdInput"
      />
      <label className="sr-only" htmlFor="kbdInput">
        Search
      </label>
    </div>
  );
}
