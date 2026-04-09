import React, { useEffect, useState } from 'react';

function SearchBar({ searchFilters, onSearch }) {
  const [filters, setFilters] = useState(searchFilters);

  useEffect(() => {
    setFilters(searchFilters);
  }, [searchFilters]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-[28px] border border-white/10 bg-stone-900/80 p-5 shadow-2xl shadow-black/20 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_0.8fr_auto] xl:items-end"
    >
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-stone-200">Location</span>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Goa, Mumbai, Jaipur..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-amber-300"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-stone-200">Check in</span>
        <input
          type="date"
          name="checkInDate"
          value={filters.checkInDate}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-stone-200">Check out</span>
        <input
          type="date"
          name="checkOutDate"
          value={filters.checkOutDate}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-stone-200">Guests</span>
        <select
          name="guests"
          value={filters.guests}
          onChange={handleChange}
          className="w-full appearance-none rounded-2xl border border-white/10 bg-white px-4 py-3 text-stone-950 outline-none transition focus:border-amber-300"
        >
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
        </select>
      </label>

      <button
        type="submit"
        className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
