import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface User {
  name: string;
  email: string;
  bio: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [createError, setCreateError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token');
        console.log('Token:', token);

        const response = await axios.get('http://localhost:8080/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data.status) {
          setUser(response.data.user);
        } else {
          setCreateError(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    router.push('/user/edit');
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-md-9 bg-white p-3">
          <h1>Profile</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Bio: {user.bio || 'N/A'}</p>
          <button className="btn btn-primary" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
