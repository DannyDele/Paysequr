import React from 'react'
import { useForm } from 'react-hook-form';
import Logo from '../../assets/Logo.svg'

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    
    return (
    <section> 
        <nav className='bg-slate-50 h-[50px] pl-4'>
          <div className=''>
            <img src={Logo} alt="Logo" className='w-20 h-14'/>
          </div>
      </nav>
      <div className='flex items-center justify-center h-screen bg-white'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-[364px] py-[30px] px-[18px] rounded bg-gray-100'>
        <h2 className='text-2xl mb-4'>What's your phone number or email?</h2>
        <input type="text" placeholder="Email" className='p-[10px] border-2 border-black mb-[20px]' {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
        <input type="password" placeholder="Password" className='p-[10px] border-2 border-black mb-[20px]' {...register("Password", {required: true, maxLength: 100})} />
  
        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-10' onClick={onSubmit}>Sign Up</button>
        <p className='text-xs font-light text-[#6B6B6B]'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Paysequr and its affiliates to the number provided.</p>
        </form>
      </div>
      </section>
    );
}

export default SignUp;