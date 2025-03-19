import React from 'react'

function NewsLetter() {
  return (
    <div className="bg-yellow-900 border-solid border-nanuelectricscom-black border-t-2 pt-12 pb-12 flex flex-col items-start justify-start relative">
      <div className="px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
        {/* Left Section */}
        <div className="flex flex-col gap-4 md:gap-6 items-start justify-start w-full md:w-1/2">
          {/* Title */}
          <div className="text-nanuelectricscom-nero text-left font-semibold uppercase text-lg md:text-2xl">
            GET THE NEWSLETTER
          </div>

          {/* Description */}
          <div className="text-nanuelectricscom-nero text-left text-sm md:text-base leading-relaxed max-w-full md:max-w-[600px]">
            A thoughtful newsletter for design nerds & curious people. Plus,
            you’ll automatically be entered in our vintage clock giveaways.
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start justify-start w-full md:w-auto">
          <div className="flex flex-row items-center gap-2 w-full max-w-full md:max-w-[380px]">
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-md border-2 border-nanuelectricscom-nero bg-transparent text-nanuelectricscom-nero placeholder-nanuelectricscom-nero-50 px-4 py-2 text-sm md:text-base focus:outline-none"
            />
            {/* Submit Button */}
            <button className="rounded-md bg-white text-black px-4 py-2 font-semibold text-sm md:text-base uppercase hover:bg-gray-400 hover:text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter
