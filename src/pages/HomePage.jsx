import React from 'react';
import HotelCard from '../components/HotelCard.jsx';
import SearchBar from '../components/SearchBar.jsx';

function HomePage({ featuredHotels, searchFilters, onSearch, totalAvailableRooms, totalHotels }) {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Search hotels, choose a room, and confirm a stay in a few clicks.
            </h1>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard label="Hotels" value={totalHotels} />
              <StatCard label="Available Rooms" value={totalAvailableRooms} />
              <StatCard label="Selected Guests" value={searchFilters.guests} />
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-3 backdrop-blur">
            <SearchBar searchFilters={searchFilters} onSearch={onSearch} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-200">
              Hotel List
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Available places to stay</h2>
          </div>
          <p className="text-sm text-stone-400">
            Showing {featuredHotels.length} hotel{featuredHotels.length === 1 ? '' : 's'}
          </p>
        </div>

        {featuredHotels.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.hotel_id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-white/5 p-10 text-center text-stone-300">
            No hotels matched your search. Try another city or reduce the guest count.
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-stone-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default HomePage;
