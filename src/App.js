import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp';
import SuperAdmin from './pages/SuperAdmin/SuperAdmin';

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<SuperAdmin/>} />
        {/* <Route path='/download-app' element={<DownloadApp/>} /> */}
        {/* <Route path='/contact' element={<Contact/>} /> */}
      </Routes>
    </div>
  );
}

export default App;
