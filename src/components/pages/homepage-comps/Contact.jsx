import Swal from 'sweetalert2'

const Contact = () => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        
        try {
            const response = await fetch("https://formspree.io/f/mdkloqoe", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    iconColor: '#0DFC4B',
                    title: 'Thank you for contacting me. It will be a pleasure to work with you!',
                    showConfirmButton: true,
                    background: '#191a19',
                    color: '#fff',
                    confirmButtonColor: '#117911',
                    backdrop: `
                        rgba(54, 55, 54,0.4)
                    `
                });
                event.target.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                iconColor: '#ff0000',
                title: 'Sorry, something went wrong. Please try again or email me directly at pissaypratheesh@gmail.com',
                showConfirmButton: true,
                background: '#191a19',
                color: '#fff',
                confirmButtonColor: '#117911',
                backdrop: `
                    rgba(54, 55, 54,0.4)
                `
            });
        }
    }
    

    return (
        <section name='Contact' className='relative w-full md:h-screen p-4 text-white h-unset'>
            <div className='flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full'>
                <div className='pb-8'>
                    <h2 className='text-4xl font-bold inline border-b-4 border-primary-color/40 sm:text-5xl'>Contact</h2>
                    <p className='py-6'>Ready to hire a Principal Software Engineer? Let&apos;s discuss your next challenging project or engineering leadership opportunity.</p>
                </div>

                <div className='flex justify-center items-center'>
                    <form 
                        onSubmit={handleSubmit} 
                        className='flex flex-col w-full md:w-1/2'
                    >
                        {/* Hidden field for better email organization */}
                        <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission" />
                        
                        <input 
                        type="text" 
                        name='name' placeholder='Enter your name' 
                        className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-primary-color' required/>

                        <input 
                        type="email" 
                        name='email' placeholder='Enter your email' 
                        className='my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-primary-color' required />

                        <textarea name="message" rows="10" placeholder='Enter your message' className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-primary-color' required></textarea>

                        <button className='text-black font-semibold bg-gradient-to-t from-green-400 to-primary-color px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300'>Hire Me - Let&apos;s Talk</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact