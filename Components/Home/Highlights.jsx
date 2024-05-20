import React from 'react'
const Highlights = () => {
  return (
    <section className="py-8 px-4 sm:px-8">
        <div>
            <h1 className='text-center font-bold text-[28px] sm:text-[40px]'>Highlights</h1>
        </div>
        <br/>
        <div className="grid grid-cols-2  sm:grid-cols-4 gap-5">
            <img src="/assets/Highlights/Highlight1.png" width={"100%"} className='h-[180px] sm:h-[320px]' />
            <img src="/assets/Highlights/Highlight2.png" width={"100%"} className='h-[180px] sm:h-[320px]' />
            <img src="/assets/Highlights/Highlight3.png" width={"100%"} className='h-[180px] sm:h-[320px]' />
            <img src="/assets/Highlights/Highlight4.png" width={"100%"} className='h-[180px] sm:h-[320px]' />
        </div>
    </section>
  )
}

export default Highlights