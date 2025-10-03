import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; //allows us to use zod in react-hook-form
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../authSlice';
import { useNavigate, NavLink } from 'react-router';
import { useEffect, useState } from 'react';



//Schema validation for signup form 
const signupSchema = z.object({
  firstName: z.string().min(3, "Name should contain at least 3 characters"),
  emailId: z.email("Invalid email"),
  password: z.string().min(8, "Password is too weak")
});

const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, load, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: zodResolver(signupSchema) });
  /*
  When there is no error 
  error={
    firstName:undefined,
    emailId: undefined,
    password:undefined
  }

  When some error occurs 
   error = {
      firstName:{
        type:'minLength', //Type of validation that failed 
        message: 'Min character should be 3' // Custom error message 
      },
      emailId: {
        type:'invalid_string', //Type of validation that failed 
        message: 'Invalid email' // Custom error message 
      },
      password:{
        type:...,
        message:....
      }
   }
  
  */

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated])
  const submittedData = (data) => {
    dispatch(registerUser(data));
  }

  if (load) {
    return <span class="loading loading-spinner loading-lg"></span>
  }


  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <form
        onSubmit={handleSubmit(submittedData)}
        className="card w-full max-w-sm shadow-xl bg-base-100 p-6"
      >
        <h2 className="text-2xl font-bold text-center mb-6">CodePropel</h2>

        <div className="form-control mb-4">
          <label className="label cursor-pointer" htmlFor="firstName">
            <span className="label-text font-medium">Name</span>
          </label>
          <input
            id="firstName"
            {...register('firstName')}
            type="text"
            placeholder="Bob"
            className="input input-bordered w-full"
          />
          {errors.firstName && <p className='text-red-600 mt-1'>{errors.firstName.message}</p>}
        </div>

        <div className="form-control mb-4">
          <label className="label cursor-pointer" htmlFor="email">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            id="email"
            {...register('emailId')}
            type="email"
            placeholder="bob@gmail.com"
            className="input input-bordered w-full"
            autoComplete="email"
          />
          {errors.emailId && <p className='text-red-600 mt-1'>{errors.emailId.message}</p>}
        </div>

        <div className="form-control mb-4">
          <label className="label cursor-pointer" htmlFor="password">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="relative"> {/* Added relative container */}
            <input
              id='password'
              {...register('password')}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input input-bordered w-full pr-10" // Added right padding
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <p className='text-red-600 mt-1'>{errors.password.message}</p>}
        </div>

        <div className="form-control mt-2 flex justify-center">
          <button
            type="submit"
            className={`btn btn-primary ${load ? 'loading' : ''}`}
            disabled={load}
          >
            {load ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>

        <div className="text-center mt-6"> {/* Increased mt for spacing */}
          <span className="text-sm">
            Already have an account?{' '}
            <NavLink to="/login" className="link link-primary">
              Login
            </NavLink>
          </span>
        </div>
      </form>
    </div>




  );
}

export default Signup