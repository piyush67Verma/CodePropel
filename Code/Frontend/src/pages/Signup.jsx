import { useForm } from 'react-hook-form';

const Signup = () => {
  const {register, handleSubmit, formState: { errors },} = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('firstName')} placeholder='Enter Name' />
      <input {...register('email')} placeholder='Enter Email' />
      <input {...register('password')} placeholder='Enter Password'/>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

export default Signup