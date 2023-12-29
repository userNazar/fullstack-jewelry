"use client";

import { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { IoMdClose } from "react-icons/io";

const PreHeader = () => {
    const [positionOfSlider, setPositionOfSlider] = useState<number>(0);
    const [closedSlider, setClosedSlider] = useState<boolean>(false);
    const handleNext = () => {
        if (positionOfSlider >= 2 * 100) {
            setPositionOfSlider(0);
        } else {
            setPositionOfSlider((prevPosition) => prevPosition + 100);
        }

    };

    const handlePrevious = () => {
        if (positionOfSlider <= 1) {
            setPositionOfSlider(2 * 100);
        } else {
            setPositionOfSlider((prevPosition) => prevPosition - 100);
        }

    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 2000);

        return () => clearInterval(interval);
        /* eslint-disable */
    }, [positionOfSlider]);


    if (closedSlider) {
        return <div className='bg-teal-300 h-[5px]'></div>
    }


    return (
        <div className='flex justify-between items-center w-full bg-teal-400'>
            <div className='m-4 cursor-pointer ml-10' onClick={handlePrevious}>
                <AiOutlineLeft />
            </div>

            <div className='w-full overflow-hidden'>
                <div className='flex transition-transform duration-500' style={{ transform: `translateX(-${positionOfSlider}%)` }}>
                    <div className="flex items-center w-full flex-shrink-0 text-black text-xl font-semibold justify-center">
                        We are the best!
                    </div>
                    <div className="flex items-center w-full flex-shrink-0 text-black text-xl font-semibold justify-center">
                        All for you!
                    </div>
                    <div className="flex items-center w-full flex-shrink-0 text-black text-xl font-semibold justify-center">
                        Sales for old users!
                    </div>
                </div>
            </div>

            <div className='flex items-center'>
                <div className='m-4 cursor-pointer' onClick={handleNext}>
                    <AiOutlineRight />
                </div>
                <div className='mr-2 cursor-pointer' onClick={() => setClosedSlider(true)}>
                    <IoMdClose size={20} />
                </div>
            </div>

        </div>
    )
}

export default PreHeader;