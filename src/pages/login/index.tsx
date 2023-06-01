import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/users/login', data);
      if (response.status === 200) {
        const token = response.data.user.token;
        const idUser = response.data.user.id;
        Cookies.set('id', idUser);
        Cookies.set('token', token);
        router.push('/profile');
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error(error);
      setLoginError(true);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {loginError && <p className="text-danger">Incorrect email or password</p>}
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
          <label htmlFor="password" className="form-label">Password</label>
          <input
            {...register('password', { required: true })}
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
          />
          {errors.password && <div className="invalid-feedback">Password is required</div>}
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">Login</button>
      </form>
      <p>Don't have an account? <a href="/sign-up">Sign up</a></p>
    </div>
  );
};

export default LoginForm;
