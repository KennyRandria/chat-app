import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Navbar from '@/components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfileForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [editError, setEditError] = useState(false);

  const onSubmit = async (data) => {
    if (data.name === '') {
      delete data.name;
    }
    try {
      const token = Cookies.get('token');
      const response = await axios.put('http://localhost:8080/user', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        router.push('/profile');
      } else {
        setEditError(true);
      }
    } catch (error) {
      console.error(error);
      setEditError(true);
    }
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Edit Profile</h1>
              {editError && <p className="text-danger">An error occurred while editing the profile.</p>}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input {...register('name')} type="text" className="form-control" id="name" />
                  {errors.name && <p className="text-danger">Name is required</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label">Old Password</label>
                  <input {...register('oldPassword')} type="password" className="form-control" id="oldPassword" />
                  {errors.oldPassword && <p className="text-danger">Old Password is required</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">New Password</label>
                  <input {...register('password')} type="password" className="form-control" id="password" />
                  {errors.password && <p className="text-danger">New Password is required</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="bio" className="form-label">Bio</label>
                  <textarea {...register('bio')} className="form-control" id="bio" rows="3"></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
