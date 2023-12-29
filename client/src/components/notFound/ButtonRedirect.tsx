'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const ButtonRedirect = () => {
    const router = useRouter();
    return (
        <button
            onClick={() => router.replace('/')}
            className="mb-5 w-64 h-12 bg-black text-white font-medium rounded-lg hover:bg-teal-500 hover:border-teal-500 hover:text-black transition duration-300"
        >
            Go back home
        </button>
    )
}

export default ButtonRedirect