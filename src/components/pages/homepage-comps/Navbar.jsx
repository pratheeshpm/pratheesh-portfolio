import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from "react-scroll"
import { NavLink } from "react-router-dom"

const Navbar = () => {
    
    const links = [
        {
            id: 1,
            link: "Home",
            type: "scroll"
        },
        {
            id: 2,
            link: "About",
            type: "scroll"
        },
        {
            id: 3,
            link: "Projects",
            type: "scroll"
        },
        {
            id: 4,
            link: 'Technologies',
            type: "scroll"
        },
        {
            id: 5,
            link: "System Design",
            type: "route",
            path: "/system-design"
        },
        {
            id: 6,
            link: "Education",
            type: "scroll"
        },
        {
            id: 7,
            link: "Contact",
            type: "scroll"
        }
    ]

    const [isShowNav, setIsShowNav] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset
            if (scrollTop > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={`fixed top-0 flex bg-neutral-900/60 justify-between h-20 items-center py-4 px-4 md:px-6 text-white mx-auto lg:px-24 md:py-0 w-full z-30 transition-colors duration-700 ${isScrolled ? 'bg-black/90' : ''}`}>
            <div className='flex flex-row gap-4 items-center'>
                <h1 className='text-[1.1rem] lg:text-[1.3rem] hover:text-primary-color hover:scale-125 duration-500'>
                    <i className='bx bx-code-curly mr-2 text-base'></i>
                                                    Pratheesh PM
                </h1>
            </div>

            <ul className='hidden lg:flex'>
                {links.map(({ id, link, type, path }) => (
                    <li key={id} className='cursor-pointer hover:scale-105 rounded-lg hover:bg-primary-color p-4 duration-200 hover:text-black text-[1.1rem] lg:text-[1.3rem]'>
                        {type === "route" ? (
                            <NavLink to={path} target="_blank" rel="noopener noreferrer" className="hover:text-current">{link}</NavLink>
                        ) : (
                            <Link to={link} smooth duration={500}>{link}</Link>
                        )}
                    </li>
                ))}
            </ul>

            <div onClick={() => setIsShowNav(!isShowNav)} className='cursor-pointer pr-4 z-10 text-gray-100 lg:hidden'>
                {isShowNav ? <FaTimes size={30} /> : <FaBars size={30} /> }
            </div>

            {isShowNav && (
            <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black via-black to-green-950 opacity-90'>

                {links.map(({ id, link, type, path }) => (
                        <li  
                        key={id} 
                        className='px-4 cursor-pointer py-6 text-4xl opacity-100'>
                            {type === "route" ? (
                                <NavLink 
                                    onClick={() => setIsShowNav(!isShowNav)}
                                    to={path} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-primary-color transition-colors">
                                    {link}
                                </NavLink>
                            ) : (
                                <Link 
                                    onClick={() => setIsShowNav(!isShowNav)}
                                    to={link} 
                                    smooth 
                                    duration={500}>{link}</Link>
                            )}
                        </li>
                ))}
            </ul> )}

            
        </header>
    )
}

export default Navbar
