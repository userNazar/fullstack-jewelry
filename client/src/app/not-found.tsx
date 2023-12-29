import ButtonRedirect from '@/components/notFound/ButtonRedirect';
import Image from 'next/image';

const NotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen -mt-16 px-6 text-center'>
            <Image
                src="/static/404.png"
                width={300}
                height={300}
                alt="404 Error"
                className="animate-bounce"
            />
            <h1 className="text-2xl font-semibold mt-5">Oops! Page not found.</h1>
            <p className="mt-2 mb-8 text-gray-500">We cannot seem to find the page you are looking for.</p>
            <ButtonRedirect />
            <Image
                src="/static/blue-box.jpg"
                width={100}
                height={100}
                alt="Decorative Image"
            />
            <p className="absolute bottom-4 text-sm text-gray-400">&copy; M&Co. 2023</p>
        </div>
    )
}

export default NotFound;
