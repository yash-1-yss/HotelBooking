import React, { useMemo } from 'react';

function UserProfilePage({ user, bookings, rooms, hotels }) {
  const enrichedBookings = useMemo(
    () =>
      bookings
        .filter((booking) => booking.user_id === user.user_id)
        .map((booking) => {
          const room = rooms.find((item) => item.room_id === booking.room_id);
          const hotel = hotels.find((item) => item.hotel_id === room?.hotel_id);

          return {
            ...booking,
            roomType: room?.room_type || 'Unknown room',
            hotelName: hotel?.hotel_name || 'Unknown hotel',
            location: hotel?.location || 'Unknown location',
          };
        }),
    [bookings, hotels, rooms, user.user_id]
  );

  const today = new Date().toISOString().split('T')[0];
  const upcomingBookings = enrichedBookings.filter((booking) => booking.check_out_date >= today);
  const pastBookings = enrichedBookings.filter((booking) => booking.check_out_date < today);
  const totalSpent = enrichedBookings.reduce((sum, booking) => sum + (booking.total_price || 0), 0);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/10">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-200">Profile</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">{user.username}</h1>
          <div className="mt-6 space-y-3 text-stone-300">
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>User ID: {user.user_id}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryCard label="Upcoming" value={upcomingBookings.length} />
          <SummaryCard label="Past" value={pastBookings.length} />
          <SummaryCard label="Spent" value={`Rs. ${totalSpent}`} />
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <BookingSection
          title="Upcoming bookings"
          bookings={upcomingBookings}
          emptyLabel="No upcoming bookings yet."
        />
        <BookingSection
          title="Past bookings"
          bookings={pastBookings}
          emptyLabel="No completed bookings yet."
        />
      </section>
    </main>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10">
      <p className="text-sm text-stone-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function BookingSection({ title, bookings, emptyLabel }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>

      <div className="mt-6 space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <article
              key={booking.booking_id}
              className="rounded-[24px] border border-white/10 bg-black/10 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-white">{booking.hotelName}</p>
                  <p className="text-sm text-stone-400">
                    {booking.location} | {booking.roomType}
                  </p>
                </div>
                <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-950">
                  {booking.status || 'Confirmed'}
                </span>
              </div>

              <div className="mt-4 grid gap-2 text-sm text-stone-300">
                <p>Booking ID: {booking.booking_id}</p>
                <p>Guest: {booking.guest_name || 'Primary guest'}</p>
                <p>Guests: {booking.guests_count || 1}</p>
                <p>Check in: {booking.check_in_date}</p>
                <p>Check out: {booking.check_out_date}</p>
                <p>Total price: Rs. {booking.total_price || 0}</p>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[24px] border border-dashed border-white/10 bg-black/10 p-8 text-center text-stone-300">
            {emptyLabel}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;
