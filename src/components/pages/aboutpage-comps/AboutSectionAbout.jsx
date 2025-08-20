import React from 'react'
import { Link as ScrollLink } from 'react-scroll';

const AboutSectionAbout = () => {
    return (
        <section name="About" className='relative w-full h-screen'>

            <div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 py-16 md:py-24 lg:py-0 lg:flex-row lg:gap-8'>
                
                <div className='flex mt-8 md:mt-0'>
                    <img src="/images/diegoAI.webp" alt="Pratheesh PM" className='rounded-2xl mx-auto w-2/3 max-w-lg md:max-w-sm object-cover md:w-[70rem] shadow-2xl shadow-primary-color/20' style={{ filter: 'drop-shadow(0px -4px 4px rgba(0, 255, 0, 0.5))' }} />
                </div>

                <div className='flex flex-col justify-center items-center h-[85%] md:h-full'>
                    
                    <h1 className='text-4xl md:text-5xl font-bold text-white mb-2 md:mb-4'>Who I am?</h1>

                    <div className='flex items-center bg-primary-color/20 rounded-md py-2 px-4'>
                        <h2 className='text-lg sm:text-xl md:text-2xl md:py-1 font-semibold text-white'>Principal Software Engineer</h2>
                    </div>
                    
                    <p className='text-md md:text-lg text-gray-300 py-4 max-x-md text-justify'>I'm a passionate engineer with 12 years of experience, with major contributions building systems that serve large-scale customers. I graduated with a BE in Information Science and Engineering from R.V College Of Engineering with a CGPA of 9.2.</p>

                    <p className='text-md md:text-lg text-gray-300 max-x-md text-justify'>My journey spans across industry leaders like Allen Digital (India's leading Ed-tech platform), Dailyhunt (India's leading news app), Myntra (Flipkart subsidiary), and even global companies like Disney's Playdom. I specialize in AI/ML systems, WebRTC platforms, scalable architectures, and have built everything from hackathon-winning AI projects to enterprise-grade content management systems serving thousands of users daily.</p>
                </div>
            </div>

            <ScrollLink to="Edition" smooth duration={500} className='absolute bottom-2 -left-full md:left-1/2 md:-translate-x-1/2 cursor-pointer hover:text-primary-color'>
                <i className='bx bx-chevron-down text-7xl text-gray-400 animate-bounce font hover:text-primary-color'></i>
            </ScrollLink>
        </section>
    );
}

export default AboutSectionAbout
