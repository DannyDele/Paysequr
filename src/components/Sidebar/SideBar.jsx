import React from 'react'
import Logo from '../../assets/Logo.svg'

const SideBar = () => {
  return (
        <div className='bg-white w-[270px] h-[100vh]'>
        <div className='py-3'>
          <img src={Logo} alt="PaySequr Logo" className='mx-auto'/>
        </div>
        <div>
            <div className='p-4'>
              <a href="/Transactions"><h2 className='text-orange-400 font-bold text-xl hover:bg-orange-100 ease-in duration-300 rounded-md p-3'>Transactions</h2></a>
            </div>
            <div className='p-4'>
              <a href="/Users"><h2 className='text-orange-400 font-bold text-xl hover:bg-orange-100 ease-in duration-300 rounded-md p-3'>Users</h2></a>
            </div>
            <div className='p-4'>
              <a href="/Merchants"><h2 className='text-orange-400 font-bold text-xl hover:bg-orange-100 ease-in duration-300 rounded-md p-3'>Merchants</h2></a>
            </div>
            <div className='p-4'>
              <a href="/Products"><h2 className='text-orange-400 font-bold text-xl hover:bg-orange-100 ease-in duration-300 rounded-md p-3'>Products</h2></a>
            </div>
            <div className='p-4'>
              <a href="/Wallets"><h2 className='text-orange-400 font-bold text-xl hover:bg-orange-100 ease-in duration-300 rounded-md p-3'>Wallets</h2></a>
            </div>
        </div>
      </div>
  )
}

export default SideBar