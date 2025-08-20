import React from 'react'
import { Link } from 'react-router-dom'

import easyshop from '/images/projectsImages/easyshop.webp'
import pokedex from '/images/projectsImages/pokedex.webp'
import acciovocabulary from '/images/projectsImages/acciovocabulary.webp'
import rickandmorty from '/images/projectsImages/rickandmorty.webp'
import academloshop from '/images/projectsImages/academloshop.webp'
import weatherapp from '/images/projectsImages/weatherapp.webp'
import dogsblog from '/images/projectsImages/dogsblog.webp'
import crud from '/images/projectsImages/crud.webp'
import moviepedia from '/images/projectsImages/moviepedia.webp'
import tictactoe from '/images/projectsImages/tictactoe.webp'
import soccerquotes from '/images/projectsImages/soccerquotes.webp'
import fortunecookies from '/images/projectsImages/fortunecookies.webp'
import todomachine from '/images/projectsImages/todomachine.webp'

const AllProjects = () => {

    const projects = [
        {
            id: 1,
            src: easyshop,
            demo: 'https://github.com/pissaypratheesh/autogen-ui-examples',
            code: 'https://github.com/pissaypratheesh/autogen-ui-examples'
        },
        {
            id: 2,
            src: acciovocabulary,
            demo: 'https://github.com/pissaypratheesh/chatgpt-clone',
            code: 'https://github.com/pissaypratheesh/chatgpt-clone'
        },
        {
            id: 3,
            src: dogsblog,
            demo: 'https://github.com/pissaypratheesh/virtualized-bidirectional-infinite-scroll',
            code: 'https://github.com/pissaypratheesh/virtualized-bidirectional-infinite-scroll'
        },
        {
            id: 4,
            src: academloshop,
            demo: 'https://github.com/pissaypratheesh/mediasoup-client-web',
            code: 'https://github.com/pissaypratheesh/mediasoup-client-web'
        },
        {
            id: 5,
            src: weatherapp,
            demo: 'https://github.com/pissaypratheesh/mediasoup-client-android',
            code: 'https://github.com/pissaypratheesh/mediasoup-client-android'
        },
        {
            id: 6,
            src: rickandmorty,
            demo: 'https://github.com/pissaypratheesh/singleton-renderer',
            code: 'https://github.com/pissaypratheesh/singleton-renderer'
        },
        {
            id: 7,
            src: todomachine,
            demo: 'https://pratheeshpm.netlify.app',
            code: 'https://github.com/pratheeshpm/pratheesh-portfolio'
        },
        {
            id: 8,
            src: crud,
            demo: 'https://github.com/pissaypratheesh',
            code: 'https://github.com/pissaypratheesh'
        }
    ]

    const handleClickDemo = (demoUrl) => {
        const newWindow = window.open(demoUrl, '_blank');
        newWindow.opener = null;
        newWindow.rel = 'noopener noreferrer';
    }

    const handleClickCode = (codeUrl) => {
        const newWindow = window.open(codeUrl, '_blank');
        newWindow.opener = null;
        newWindow.rel = 'noopener noreferrer';
    }
    

    return (
        <section name="Projects" className='relative w-full text-white md:min-h-screen mt-24 mb-10'>
        
            <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
                <div className='pb-8'>
                    <h2 className='text-4xl font-bold inline border-b-4 border-primary-color/40 sm:text-5xl'>Projects</h2>
                    <p className='py-6'>Explore my professional projects and open-source contributions.</p>
                </div>

                <div  className='grid sm:grid-cols-2 md:grid-cols-3 gap-8'>
                    {
                        projects.map(({ id, src, demo, code }) => (
                                <div key={id} className='shadow-md shadow-gray-600 rounded-lg max-w-md mx-auto'>
                                    <img loading='lazy' src={src} alt="project card" className='rounded-md duration-200 hover:scale-105' />
                                    <div className='flex items-center justify-center'>
                                        <button onClick={() => handleClickDemo(demo)} className='w-1/2 px-6 py-2 m-4 duration-200 hover:scale-125'>Demo</button>
                                        <button onClick={() => handleClickCode(code)} className='w-1/2 px-6 py-2 m-4 duration-200 hover:scale-125'>Code</button>
                                    </div>
                                </div>
                        ))
                    }
                </div>
            </div>

            <div className='flex justify-center'>
                <Link to='/' className='text-black font-semibold text-[16px] w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-green-400 to-primary-color cursor-pointer mx-auto md:mx-0 self-end mt-8 hover:scale-110 duration-300'>
                    <span className=''><i className='bx bx-home-heart mr-2'></i></span>
                    Go back
                </Link>
            </div>
        </section>
    )
}

export default AllProjects
