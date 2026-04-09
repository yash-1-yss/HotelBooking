import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddHotelPage({ onAddHotel }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hotelName: '',
    location: '',
    rating: '4.5',
    priceFrom: '',
    image: '',
    description: '',
    amenities: '',
    roomType: '',
    roomPrice: '',
    beds: '',
    guests: '2',
  });
  const [error, setError] = useState('');

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

    const requiredFields = [
      'hotelName',
      'location',
      'priceFrom',
      'image',
      'description',
      'amenities',
      'roomType',
      'roomPrice',
      'beds',
      'guests',
    ];

    const hasMissingField = requiredFields.some((field) => !String(formData[field]).trim());

    if (hasMissingField) {
      setError('Please fill in all hotel and room details.');
      return;
    }

    const hotelId = onAddHotel({
      ...formData,
      amenities: formData.amenities
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    });

    navigate(`/hotels/${hotelId}`);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-200">
          Add Hotel
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Create a new hotel listing</h1>
        <p className="mt-4 max-w-2xl text-stone-300">
          Add the hotel details and one available room. The hotel will appear in the list
          immediately after submission.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8">
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              label="Hotel name"
              name="hotelName"
              value={formData.hotelName}
              onChange={handleChange}
              placeholder="Yash Residency"
            />
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Delhi"
            />
            <InputField
              label="Rating"
              name="rating"
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.5"
            />
            <InputField
              label="Starting price"
              name="priceFrom"
              type="number"
              min="1"
              value={formData.priceFrom}
              onChange={handleChange}
              placeholder="4500"
            />
          </div>

          <InputField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
          />

          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="A modern hotel with comfortable rooms and great city access."
          />

          <InputField
            label="Amenities"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            placeholder="Free Wi-Fi, Breakfast, Parking, Pool"
          />

          <div className="border-t border-white/10 pt-8">
            <h2 className="text-2xl font-semibold text-white">First room details</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <InputField
                label="Room type"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                placeholder="Deluxe Room"
              />
              <InputField
                label="Room price"
                name="roomPrice"
                type="number"
                min="1"
                value={formData.roomPrice}
                onChange={handleChange}
                placeholder="4500"
              />
              <InputField
                label="Beds"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                placeholder="1 King Bed"
              />
              <InputField
                label="Guests"
                name="guests"
                type="number"
                min="1"
                max="10"
                value={formData.guests}
                onChange={handleChange}
                placeholder="2"
              />
            </div>
          </div>

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
            >
              Add hotel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function InputField({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-stone-200">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-amber-300"
      />
    </label>
  );
}

function TextAreaField({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-stone-200">{label}</span>
      <textarea
        {...props}
        rows="4"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-amber-300"
      />
    </label>
  );
}

export default AddHotelPage;
