import SearchIcon from '../../assets/icon_search.png'
import bellIcon from '../../assets/bell.png'
import MessageIcon from '../../assets/msg.png'
import ClientIcon from '../../assets/client_img.png'
import SideBar from '../../components/Sidebar/SideBar'


const SuperAdmin = () => {
  return (
    <div className='flex'>
      {/* Sidebar */}
      <SideBar />
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
      <section>
        <div className='flex justify-between gap-8 p-4 items-center'>
          <div className='py-[43px] px-[50px] bg-white rounded-md'><h2 className='align-middle text-center font-bold'>23,900<br/><p className='font-normal'>Users</p></h2></div>
          <div className='py-[43px] px-[38.5px] bg-white rounded-md'><h2 className='align-middle text-center font-bold'>253,900<br/><p className='font-normal'>Transactions</p></h2></div>
          <div className='py-[43px] px-[38.5px] bg-white rounded-md'><h2 className='align-middle text-center font-bold'>53,900<br/><p className='font-normal'>Merchants</p></h2></div>
          <div className='py-[43px] px-[38.5px] bg-white rounded-md'><h2 className='align-middle text-center font-bold'>209,900<br/><p className='font-normal'>Products</p></h2></div>
        </div>
      </section>
      </main>
    </div>
  )
}

export default SuperAdmin