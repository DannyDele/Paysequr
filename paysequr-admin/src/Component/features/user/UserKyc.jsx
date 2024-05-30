import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function UserKyc({onClose}) {
  return (
      <div>
    <ArrowBackIcon sx={{ marginRight: '1rem' }} onClick={onClose} />                     

          UserKyc
      </div>
  )
}

export default UserKyc