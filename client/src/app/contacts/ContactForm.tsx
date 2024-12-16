'use client'

import { useAppSelector } from "@/redux/hooks";
import contactService from "@/services/contactService";
import { FormEvent, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';

const ContactForm = () => {

    const { user } = useAppSelector(state => state.user);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>(user ? user.email : '');
    const [helpText, setHelpText] = useState<string>('');

    const submitHanlder = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        try {
            contactService.sendContactMessage(
                'TO EMAIL CHANGE ON ENV',
                email,
                firstName,
                lastName,
                helpText
            );

            toast.success('Message sent successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setFirstName('');
            setLastName('');
            setHelpText('');
        } catch (error) {
            toast.error('Failed to send message. Please try again.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            console.error(error);
        }
    }

    return (
        <form onSubmit={submitHanlder} className="w-[300px] md:w-[500px] mx-5 shadow-lg px-5 py-10">
            <div className="flex">
                <input
                    className="mt-5 mx-2 block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    className="mt-5 mx-2 block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                />
            </div>
            <div>
                <input
                    className="mt-5 mx-2 block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
            </div>
            <div>
                <input
                    className="mt-5 mx-2 block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                    type="text"
                    value={helpText}
                    onChange={(e) => setHelpText(e.target.value)}
                    placeholder="How we can help?"
                    required
                />
            </div>
            <button
                className="mt-10 w-full h-[50px] flex justify-center items-center bg-black text-white cursor-pointer border border-black hover:bg-teal-200 hover:text-black transition duration-500"
            >
                Send
            </button>
            <ToastContainer />
        </form>
    )
}

export default ContactForm