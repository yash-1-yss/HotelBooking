import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar({ currentUser, bookingCount, onLogout }) {
  const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-amber-400 text-stone-950'
        : 'text-stone-200 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-stone-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400 text-lg font-bold text-stone-950">
            HB
          </div>
          <div>
            <p className="text-lg font-semibold text-white">Hotel Booking</p>
            <p className="text-xs text-stone-400">Simple frontend system</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/add-hotel" className={navLinkClass}>
            Add Hotel
          </NavLink>
          <NavLink to="/profile" className={navLinkClass}>
            My Bookings
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
            <p className="text-sm font-semibold text-white">{currentUser.username}</p>
            <p className="text-xs text-stone-400">{bookingCount} booking(s)</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:bg-white/10 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
