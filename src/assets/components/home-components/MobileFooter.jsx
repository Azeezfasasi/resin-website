import React from 'react';
import { Link } from 'react-router-dom';


function MobileFooter() {
  return (
    <>
    <div className="h-[fit-content] fixed bottom-0 z-50 bg-white w-full flex flex-row justify-between items-center md:hidden border border-solid border-gray-700">
        <div className="bg-[#ffffff] w-[100%] h-[fit-cntent] flex flex-row items-center justify-center gap-8 pt-[10px]">
            <Link to ="/" className="w-[60px] h-[54px] flex flex-col items-center">
                <div
                className="text-[body-text] text-center font-['YuGothicUi-Light',_sans-serif] text-[13px] font-semibold text-yellow-900"
                style={{ letterSpacing: "0.1px", translate: "0 -50%" }}
                >
                Home
                </div>
                <div className="">
                    <i className='fa fa-home text-[24px] text-yellow-900'></i>
                </div>
            </Link>
            <Link to="/app/shop" className="w-[60px] h-[54px] flex flex-col items-center">
                <div
                className="text-body-text text-center font-['YuGothicUi-Light',_sans-serif] text-[13px] font-semibold text-yellow-900"
                style={{ letterSpacing: "0.1px", translate: "0 -50%" }}
                >
                Shop
                </div>
                <div className="">
                    <i className='fa fa-shop text-[24px] text-yellow-900'></i>
                </div>
            </Link>
            <Link to="/app/cart" className="w-[60px] h-[54px] flex flex-col items-center">
                <div
                className="text-active-color-1 text-center font-['YuGothicUi-Light',_sans-serif] text-[13px] font-semibold text-yellow-900"
                style={{ letterSpacing: "0.1px", translate: "0 -50%" }}
                >
                Cart
                </div>
                <div className="">
                    <i className='fa fa-shopping-cart text-[24px] text-yellow-900'></i>
                </div>
            </Link>
            <Link to="/app/myaccount" className="w-[60px] h-[54px] flex flex-col items-center">
                <div
                className="text-center font-['YuGothicUi-Light',_sans-serif] text-[13px] font-semibold text-yellow-900"
                style={{ letterSpacing: "0.1px", translate: "0 -50%" }}
                >
                Account
                </div>
                <div className="">
                    <i className='fa fa-user text-[24px] text-yellow-900'></i>
                </div>
            </Link>
        </div>
    </div>

    </>
  )
}

export default MobileFooter