import React from 'react'
import { Helmet } from 'react-helmet'
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu'
import MobileFooter from '../assets/components/home-components/MobileFooter'
import Registration from '../assets/components/account-components/Registration'
import AccountHeader from '../assets/components/account-components/AccountHeader'

function RegistrationDetails() {
  return (
    <>
    <Helmet>
      <title>Registration Details - Resin By Saidat</title>
    </Helmet>
    <div className='w-full flex flex-row justify-start border'>
      {/* Menu section */}
      <div className='w-[0%] lg:w-[20%]'>
        <MyAccountMenu />
      </div>

      {/* Main Account Section */}
      <div className='w-[100%] lg:w-[80%] flex flex-col items-start justify-start '>
        <AccountHeader />
        <div className='w-full h-[100%] flex flex-col items-start justify-start p-4'>
          <Registration />
        </div>
      </div>
    </div>
    <MobileFooter />
    </>
  )
}

export default RegistrationDetails