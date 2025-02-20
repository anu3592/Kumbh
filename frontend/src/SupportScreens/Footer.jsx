import { FaTwitterSquare, FaGithubSquare, FaInstagramSquare, FaFacebookSquare } from 'react-icons/fa'
function Footer()
{
    return (
        <div className="max-w-[1520px] m-auto px-4 py-2 bg-[#24262b]">
            <div className="py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
                <div>
                    <h1 className="w-full text-3xl font-bold text-orange-500">Kumbh</h1>
                    <p>
                        The very intersting site with easily usable and easy experienced to our every
                        user or customer is now available at different countries and cities and now easily available at 
                        mobile phone. Let's have some good time.
                    </p>
                    <div className="flex justify-between md:w-[75%] my-6">
                        <FaFacebookSquare size={30}/>
                        <FaGithubSquare size={30}/>
                        <FaInstagramSquare size={30}/>
                        <FaTwitterSquare size={30}/>
                    </div>
                </div>
                <div className='lg:col-span-2 flex justify-between mt-6'>
                    <div>
                        <h6 className='font-medium text-[#9b9b9b]'>About</h6>
                        <ul>
                            <li className='py-2 text-sm'>About Us</li>
                            <li className='py-2 text-sm'>Contact Us</li>
                            <li className='py-2 text-sm'>Shop</li>
                            <li className='py-2 text-sm'>Store Locator</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-[#9b9b9b]'>Get in Touch</h6>
                        <ul>
                            <li className='py-2 text-sm'>+91999999999</li>
                            <li className='py-2 text-sm'>+91888888888</li>
                            <li className='py-2 text-sm'>Timing</li>
                            <li>10:30am to 7pm</li>
                            <li className='py-2 text-sm'>Email</li>
                            <li>abc@gmail.com</li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}

export default Footer