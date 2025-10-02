import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; //allows us to use zod in react-hook-form
import { z } from 'zod';

//Schema validation for signup form 
const signupSchema = z.object({
  firstName: z.string().min(3, "Name should contain at least 3 characters"),
  emailId: z.email("Invalid email"),
  password: z.string().min(8, "Password is too weak")
});
const Signup = () => {
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

  const submittedData = (data) => {
    console.log(data);
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
            placeholder="Enter Name"
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
            placeholder="Enter Email"
            className="input input-bordered w-full"
            autoComplete="email"
          />
          {errors.emailId && <p className='text-red-600 mt-1'>{errors.emailId.message}</p>}
        </div>

        <div className="form-control mb-6" >
          <label className="label cursor-pointer" htmlFor="password">
            <span className="label-text font-medium">Password</span>
          </label>
          <input
            id='password'
            {...register('password')}
            type="password"
            placeholder="Enter Password"
            className="input input-bordered w-full"
            autoComplete="current-password"
          />
          {errors.password && <p className='text-red-600 mt-1'>{errors.password.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">Sign Up</button>
      </form>
    </div>




  );
}

export default Signup