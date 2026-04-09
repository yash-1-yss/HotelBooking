import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import HotelDetailsPage from './pages/HotelDetailsPage.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import AddHotelPage from './pages/AddHotelPage.jsx';
import {
  bookings as initialBookings,
  hotels as initialHotels,
  rooms as initialRooms,
  users as initialUsers,
} from './data/mockData';

const STORAGE_KEYS = {
  users: 'hotel-app-users',
  currentUser: 'hotel-app-current-user',
  hotels: 'hotel-app-hotels',
  rooms: 'hotel-app-rooms',
  bookings: 'hotel-app-bookings',
};

function App() {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
  });

  useEffect(() => {
    const storedHotels = window.localStorage.getItem(STORAGE_KEYS.hotels);
    const storedRooms = window.localStorage.getItem(STORAGE_KEYS.rooms);
    const storedBookings = window.localStorage.getItem(STORAGE_KEYS.bookings);
    const parsedHotels = storedHotels ? JSON.parse(storedHotels) : initialHotels;
    const parsedRooms = storedRooms ? JSON.parse(storedRooms) : initialRooms;
    const parsedBookings = storedBookings ? JSON.parse(storedBookings) : initialBookings;

    setHotels(parsedHotels);
    setRooms(parsedRooms);
    setBookings(parsedBookings);

    if (!storedHotels) {
      window.localStorage.setItem(STORAGE_KEYS.hotels, JSON.stringify(initialHotels));
    }

    if (!storedRooms) {
      window.localStorage.setItem(STORAGE_KEYS.rooms, JSON.stringify(initialRooms));
    }

    if (!storedBookings) {
      window.localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(initialBookings));
    }

    const storedUsers = window.localStorage.getItem(STORAGE_KEYS.users);
    const parsedUsers = storedUsers ? JSON.parse(storedUsers) : initialUsers;
    setRegisteredUsers(parsedUsers);

    if (!storedUsers) {
      window.localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(initialUsers));
    }

    const storedCurrentUser = window.localStorage.getItem(STORAGE_KEYS.currentUser);

    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  useEffect(() => {
    if (hotels.length > 0) {
      window.localStorage.setItem(STORAGE_KEYS.hotels, JSON.stringify(hotels));
    }
  }, [hotels]);

  useEffect(() => {
    if (rooms.length > 0) {
      window.localStorage.setItem(STORAGE_KEYS.rooms, JSON.stringify(rooms));
    }
  }, [rooms]);

  useEffect(() => {
    if (bookings.length > 0) {
      window.localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings));
    }
  }, [bookings]);

  const filteredHotels = useMemo(() => {
    const query = searchFilters.location.trim().toLowerCase();
    const requestedGuests = Number(searchFilters.guests) || 1;

    return hotels.filter((hotel) => {
      const matchesLocation = query ? hotel.location.toLowerCase().includes(query) : true;
      const hasRoomForGuests = rooms.some(
        (room) =>
          room.hotel_id === hotel.hotel_id && room.availability && room.guests >= requestedGuests
      );

      return matchesLocation && hasRoomForGuests;
    });
  }, [hotels, rooms, searchFilters.guests, searchFilters.location]);

  const totalAvailableRooms = useMemo(
    () => rooms.filter((room) => room.availability).length,
    [rooms]
  );

  const currentUserBookings = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    return bookings.filter((booking) => booking.user_id === currentUser.user_id);
  }, [bookings, currentUser]);

  const persistCurrentUser = (user) => {
    setCurrentUser(user);
    window.localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  };

  const handleLogin = ({ email, password }) => {
    const matchedUser = registeredUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (!matchedUser) {
      return {
        success: false,
        message: 'Invalid email or password.',
      };
    }

    persistCurrentUser(matchedUser);
    return { success: true };
  };

  const handleSignup = ({ username, email, phone, password }) => {
    const userExists = registeredUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      return {
        success: false,
        message: 'An account with this email already exists.',
      };
    }

    const newUser = {
      user_id: `USR-${registeredUsers.length + 1}`,
      username,
      email,
      phone,
      password,
    };

    const nextUsers = [...registeredUsers, newUser];
    setRegisteredUsers(nextUsers);
    window.localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(nextUsers));
    persistCurrentUser(newUser);

    return { success: true };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    window.localStorage.removeItem(STORAGE_KEYS.currentUser);
  };

  const handleSearch = (filters) => {
    setSearchFilters({
      location: filters.location || '',
      checkInDate: filters.checkInDate || '',
      checkOutDate: filters.checkOutDate || '',
      guests: Number(filters.guests) || 1,
    });
  };

  const handleBookingConfirm = ({
    roomId,
    checkInDate,
    checkOutDate,
    guestName,
    guestsCount,
    totalPrice,
  }) => {
    if (!currentUser) {
      return;
    }

    setRooms((currentRooms) =>
      currentRooms.map((room) =>
        room.room_id === roomId ? { ...room, availability: false } : room
      )
    );

    setBookings((currentBookings) => [
      {
        booking_id: `BKG-${currentBookings.length + 1}`,
        user_id: currentUser.user_id,
        room_id: roomId,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        guest_name: guestName,
        guests_count: guestsCount,
        total_price: totalPrice,
        status: 'Confirmed',
      },
      ...currentBookings,
    ]);
  };

  const handleAddHotel = ({
    hotelName,
    location,
    rating,
    priceFrom,
    image,
    description,
    amenities,
    roomType,
    roomPrice,
    beds,
    guests,
  }) => {
    const nextHotelNumber = hotels.length + 101;
    const nextRoomNumber = rooms.length + 201;
    const hotelId = `HTL-${nextHotelNumber}`;

    const newHotel = {
      hotel_id: hotelId,
      hotel_name: hotelName,
      location,
      rating: Number(rating),
      price_from: Number(priceFrom),
      image,
      description,
      amenities,
    };

    const newRoom = {
      room_id: `RM-${nextRoomNumber}`,
      hotel_id: hotelId,
      room_type: roomType,
      price_per_night: Number(roomPrice),
      beds,
      guests: Number(guests),
      availability: true,
    };

    setHotels((currentHotels) => [newHotel, ...currentHotels]);
    setRooms((currentRooms) => [newRoom, ...currentRooms]);

    return hotelId;
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-stone-950 text-white">
        {currentUser ? (
          <Navbar
            currentUser={currentUser}
            bookingCount={currentUserBookings.length}
            onLogout={handleLogout}
          />
        ) : null}

        <Routes>
          <Route
            path="/auth"
            element={
              currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <AuthPage onLogin={handleLogin} onSignup={handleSignup} />
              )
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <HomePage
                  featuredHotels={filteredHotels}
                  searchFilters={searchFilters}
                  onSearch={handleSearch}
                  totalAvailableRooms={totalAvailableRooms}
                  totalHotels={hotels.length}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hotels/:hotelId"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <HotelDetailsPage
                  hotels={hotels}
                  rooms={rooms}
                  searchFilters={searchFilters}
                  onBookingConfirm={handleBookingConfirm}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <UserProfilePage
                  user={currentUser}
                  bookings={bookings}
                  rooms={rooms}
                  hotels={hotels}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-hotel"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <AddHotelPage onAddHotel={handleAddHotel} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={currentUser ? '/' : '/auth'} replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

function ProtectedRoute({ currentUser, children }) {
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default App;
