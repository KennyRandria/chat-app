import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [signupError, setSignupError] = useState(false);

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setSignupError(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users/', data);
      if (response.status === 201) {
        const token = response.data.user.token;
        const idUser = response.data.user.id;
        Cookies.set('id', idUser);
        Cookies.set('token', token);
        router.push('/profile');
      } else {
        setSignupError(true);
      }
    } catch (error) {
      console.error(error);
      setSignupError(true);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      {signupError && <p className="text-danger">Error occurred while signing up</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
          />
          {errors.email && <div className="invalid-feedback">Email is required</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            {...register('name', { required: true })}
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
          />
          {errors.name && <div className="invalid-feedback">Name is required</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            {...register('password', { required: true })}
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
          />
          {errors.password && <div className="invalid-feedback">Password is required</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
          <input
            {...register('confirmPassword', { required: true })}
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            id="confirmPassword"
          />
          {errors.confirmPassword && <div className="invalid-feedback">Confirm password is required</div>}
          {signupError && <div className="text-danger">Passwords don't match</div>}
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default RegistrationForm;
