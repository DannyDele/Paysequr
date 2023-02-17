
import Logo from '../../assets/Logo.svg'
import SearchIcon from '../../assets/icon_search.png'
import bellIcon from '../../assets/bell.png'
import MessageIcon from '../../assets/msg.png'
import ClientIcon from '../../assets/client_img.png'


const SuperAdmin = () => {
  return (
    <div className='flex'>
      {/* Sidebar */}
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
      <main className='flex-grow'>
        {/* NavBar */}
      <nav className='bg-slate-50 w-full h-[50px] flex justify-between'>
          <div className='flex items-center'>
            <img src={SearchIcon} alt="Search" className='w-7 h-7'/>
            <input type="text" placeholder='Search Here...' className='m-2 p-2 py-4 border-2 border-black bg-[#F4F7FC] rounded-md w-[280px] h-[25px]'/>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='flex space-x-3'>
              <img src={bellIcon} alt="Bell" />
              <img src={MessageIcon} alt="Message" />
            </div>
            <div className='p-2'>
              <img src={ClientIcon} alt="Client" className='w-10 h-10'/>
            </div>
          </div>
      </nav>
      </main>
    </div>
  )
}

export default SuperAdmin