import React, { useMemo, useState } from 'react';

function BookingModal({ room, hotelName, defaultDates, onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    guestName: '',
    guestsCount: String(defaultDates.guests || 1),
    checkInDate: defaultDates.checkInDate || '',
    checkOutDate: defaultDates.checkOutDate || '',
  });
  const [error, setError] = useState('');

  const nights = useMemo(() => {
    if (!formData.checkInDate || !formData.checkOutDate) {
      return 0;
    }

    const start = new Date(formData.checkInDate);
    const end = new Date(formData.checkOutDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [formData.checkInDate, formData.checkOutDate]);

  const totalPrice = nights * room.price_per_night;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.guestName || !formData.checkInDate || !formData.checkOutDate) {
      setError('Please fill in all booking details.');
      return;
    }

    if (nights <= 0) {
      setError('Check-out date must be after check-in date.');
      return;
    }

    if (Number(formData.guestsCount) > room.guests) {
      setError(`This room allows up to ${room.guests} guest(s).`);
      return;
    }

    onConfirm({
      roomId: room.room_id,
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
      guestName: formData.guestName,
      guestsCount: Number(formData.guestsCount),
      totalPrice,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4 py-10">
      <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-stone-950 p-6 shadow-2xl shadow-black/40">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-amber-300">Complete booking</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">{hotelName}</h3>
            <p className="mt-2 text-sm text-stone-400">
              {room.room_type} | Rs. {room.price_per_night} per night | Max {room.guests} guests
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-stone-300 transition hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-stone-200">Guest name</span>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-amber-300"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone-200">Check in</span>
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone-200">Check out</span>
              <input
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone-200">Guests</span>
              <select
                name="guestsCount"
                value={formData.guestsCount}
                onChange={handleChange}
                className="w-full appearance-none rounded-2xl border border-white/10 bg-white px-4 py-3 text-stone-950 outline-none transition focus:border-amber-300"
              >
                {Array.from({ length: room.guests }, (_, index) => index + 1).map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-stone-300">
            <div className="flex items-center justify-between gap-3">
              <span>Total nights</span>
              <strong className="text-white">{nights}</strong>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span>Total price</span>
              <strong className="text-white">Rs. {totalPrice}</strong>
            </div>
          </div>

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
          >
            Confirm booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
