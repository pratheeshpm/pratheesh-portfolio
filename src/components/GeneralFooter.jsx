import React from 'react'

const GeneralFooter = () => {
    return (
        <footer className='relative mt-auto flex flex-col items-center text-gray-300 mb-6 gap-2 md:flex-row md:justify-evenly'>
            
            <div className='flex gap-x-4 md:order-last'>
                <a className='text-4xl hover:text-primary-color hover:animate-bounce' target='_blank' href="https://github.com/pissaypratheesh">
                    <i className='bx bxl-github' ></i>
                </a>

                <a className='text-4xl hover:text-primary-color hover:animate-bounce' target='_blank' href="https://www.linkedin.com/in/pratheesh-pm/">
                    <i className='bx bxl-linkedin-square' ></i>
                </a>

                <a className='text-4xl hover:text-primary-color hover:animate-bounce' target='_blank' href="https://youtu.be/AlGdsjcVbSc?si=u3fELbPYrUDnGIeh">
                    <i className='bx bxl-youtube' ></i>
                </a>

                <a className='text-4xl hover:text-primary-color hover:animate-bounce' target='_blank' href="https://www.instagram.com/ai_chroniclez?igsh=MWdsczEyN3prdnR0eA==">
                    <i className='bx bxl-instagram' ></i>
                </a>


            </div>

            <p className='md:order-2'>• Copyright ©2025 Pratheesh PM | All rights reserved • </p>
                            <p>Principal Software Engineer</p>
        </footer>
    )
}

export default GeneralFooter
