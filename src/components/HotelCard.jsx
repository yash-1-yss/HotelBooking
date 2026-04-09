import React from 'react';
import { Link } from 'react-router-dom';

function HotelCard({ hotel }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-amber-300/40">
      <div className="relative h-56 overflow-hidden bg-stone-800">
        <img
          src={hotel.image}
          alt={hotel.hotel_name}
          className="block h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <span className="inline-flex rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-950">
              {hotel.location}
            </span>
            <h3 className="mt-3 text-2xl font-semibold text-white">{hotel.hotel_name}</h3>
          </div>
          <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-sm text-white backdrop-blur">
            {hotel.rating} / 5
          </span>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <p className="text-sm leading-6 text-stone-300">{hotel.description}</p>

        <div className="flex flex-wrap gap-2">
          {hotel.amenities.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-stone-200"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-400">Starting price</p>
            <p className="text-lg font-semibold text-white">Rs. {hotel.price_from}</p>
          </div>

          <Link
            to={`/hotels/${hotel.hotel_id}`}
            className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
          >
            View rooms
          </Link>
        </div>
      </div>
    </article>
  );
}

export default HotelCard;
