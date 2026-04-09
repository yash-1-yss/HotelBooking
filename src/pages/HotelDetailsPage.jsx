import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookingModal from '../components/BookingModal.jsx';

function HotelDetailsPage({ hotels, rooms, searchFilters, onBookingConfirm }) {
  const { hotelId } = useParams();
  const [selectedRoom, setSelectedRoom] = useState(null);

  const hotel = useMemo(
    () => hotels.find((item) => item.hotel_id === hotelId),
    [hotels, hotelId]
  );

  const hotelRooms = useMemo(() => {
    const requestedGuests = Number(searchFilters.guests) || 1;

    return rooms.filter(
      (room) => room.hotel_id === hotelId && room.availability && room.guests >= requestedGuests
    );
  }, [rooms, hotelId, searchFilters.guests]);

  if (!hotel) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-white">Hotel not found</h1>
        <p className="mt-3 text-stone-400">The selected hotel is unavailable right now.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-stone-950"
        >
          Back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[32px] border border-white/10 bg-black/20 shadow-xl shadow-black/20">
        <div className="relative h-72 bg-stone-800 md:h-96">
          <img
            src={hotel.image}
            alt={hotel.hotel_name}
            className="block h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">{hotel.location}</p>
            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-4xl font-semibold text-white">{hotel.hotel_name}</h1>
                <p className="mt-4 max-w-2xl text-stone-200">{hotel.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {hotel.amenities.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-sm text-stone-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-black/25 px-6 py-5 backdrop-blur">
                <p className="text-sm text-stone-300">Guest rating</p>
                <p className="mt-2 text-3xl font-semibold text-white">{hotel.rating} / 5</p>
                <p className="mt-2 text-sm text-stone-300">Rooms from Rs. {hotel.price_from}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-200">
              Room Selection
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Available rooms</h2>
          </div>
          <Link to="/" className="text-sm font-medium text-amber-200 hover:text-amber-100">
            Back to home
          </Link>
        </div>

        {hotelRooms.length > 0 ? (
          <div className="grid gap-5">
            {hotelRooms.map((room) => (
              <article
                key={room.room_id}
                className="grid gap-6 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10 lg:grid-cols-[1fr_auto]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold text-white">{room.room_type}</h3>
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-medium text-emerald-200">
                      Available
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-5 text-sm text-stone-300">
                    <p>Room ID: {room.room_id}</p>
                    <p>{room.beds}</p>
                    <p>Up to {room.guests} guests</p>
                    <p>Rs. {room.price_per_night} per night</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setSelectedRoom(room)}
                    className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
                  >
                    Book now
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-white/5 p-10 text-center text-stone-300">
            No rooms currently match the selected guest count.
          </div>
        )}
      </section>

      {selectedRoom ? (
        <BookingModal
          room={selectedRoom}
          hotelName={hotel.hotel_name}
          defaultDates={searchFilters}
          onClose={() => setSelectedRoom(null)}
          onConfirm={onBookingConfirm}
        />
      ) : null}
    </main>
  );
}

export default HotelDetailsPage;
