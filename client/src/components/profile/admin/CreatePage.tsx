'use client';

import adminService from "@/services/adminService";
import { ChangeEvent, FormEvent, useState } from "react";
import { Gender } from "../user/PersonalInfoPage";
import { ToastContainer, toast } from 'react-toastify';

const CreateProduct = () => {

    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [stock, setStock] = useState<string>("true");
    const [weight, setWeight] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [series, setSeries] = useState<string>("");
    const [ringWidth, setRingWidth] = useState<string>("");
    const [metalColor, setMetalColor] = useState<string>("");
    const [ringDesign, setRingDesign] = useState<string>("");
    const [sex, setSex] = useState<Gender>(Gender.Female);

    const handleGenderChange = (gender: Gender) => {
        setSex(gender);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file || !name || (!price && !isNaN(+price)) || !stock || !weight || (!country && !isNaN(+country)) || !series || (!ringWidth && !isNaN(+ringWidth)) || !metalColor || !ringDesign || !sex) {
            toast.error('Missing data!', {
                position: "top-center",
                autoClose: 300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        const formData = new FormData();

        formData.append('picture', file);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('weight', weight);
        formData.append('country', country);
        formData.append('series', series);
        formData.append('ringWidth', ringWidth);
        formData.append('metalColor', metalColor);
        formData.append('ringDesign', ringDesign);
        formData.append('sex', sex);

        await adminService.createProduct(formData);

        setFile(null);
        setName('');
        setPrice('');
        setStock('true');
        setWeight('');
        setCountry('');
        setSeries('');
        setRingWidth('');
        setMetalColor('');
        setRingDesign('');

        toast.success('Saved!', {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    };

    return (
        <div className='container mx-auto mt-5'>
            <h3 className="text-xl font-semibold">Creating Product</h3>
            <form
                onSubmit={handleFormSubmit}
            >
                <div className="max-w-[500px]">
                    <div className="mt-5">
                        <label>
                            <span className="text-gray-500 text-sm">Image</span>
                            <input
                                className="block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                                type="file"
                                onChange={e => handleFileChange(e)}
                                placeholder="Image"
                                required
                            />
                        </label>
                    </div>
                    <div className="mt-5">
                        <label>
                            <span className="text-gray-500 text-sm">Name</span>
                            <input
                                className="block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Name"
                                required
                            />
                        </label>
                    </div>
                    <div className="mt-5">
                        <label>
                            <span className="text-gray-500 text-sm">Price</span>
                            <input
                                className="block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                                type="text"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="Price"
                                required
                            />
                        </label>
                    </div>
                    <div className="mt-5">
                        <span className="text-gray-500 text-sm">Stock</span>
                        <select
                            className="block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                            onChange={(e) => setStock(e.target.value)}
                            value={`${stock}`}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="mt-5">
                        <label>
                            <span className="text-gray-500 text-sm">Weight</span>
                            <input
                                className="block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                                type="text"
                                value={weight}
                                onChange={e => setWeight(e.target.value)}
                                placeholder="Weight"
                                required
                            />
                        </label>
                    </div>
                    <div className="mt-5">
                        <label>
                            <span className="text-gray-500 text-sm">Country</span>
                            <input
                                className="block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                                type="text"
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                                placeholder="Country"
                                required
                            />
                        </label>
                    </div>
                    <div className="mt-5">
                        <label>
                            <span className="text-gray-500 text-sm">Series</span>
                            <input
                                className="block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                                type="text"
                                value={series}
                                onChange={e => setSeries(e.target.value)}
                                placeholder="Series"
                                required
                            />
                        </label>
                    </div>
                    <div className="mt-5">
                        <label>
                            <span className="text-gray-500 text-sm">Ring width</span>
                            <input
                                className="block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                                type="text"
                                value={ringWidth}
                                onChange={e => setRingWidth(e.target.value)}
                                placeholder="Ring width"
                                required
                            />
                        </label>
                    </div>
                    <div className="mt-5">
                        <label>
                            <span className="text-gray-500 text-sm">Metal color</span>
                            <input
                                className="block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                                type="text"
                                value={metalColor}
                                onChange={e => setMetalColor(e.target.value)}
                                placeholder="Metal color"
                                required
                            />
                        </label>
                    </div>
                    <div className="mt-5">
                        <label>
                            <span className="text-gray-500 text-sm">Ring design</span>
                            <input
                                className="block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                                type="text"
                                value={ringDesign}
                                onChange={e => setRingDesign(e.target.value)}
                                placeholder="Ring design"
                                required
                            />
                        </label>
                    </div>
                    <div className="mt-5">
                        <div className="mt-2">
                            <label>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={sex === Gender.Male}
                                    onChange={() => handleGenderChange(Gender.Male)}
                                />
                                Male
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={sex === Gender.Female}
                                    onChange={() => handleGenderChange(Gender.Female)}
                                />
                                Female
                            </label>
                        </div>

                        <div>
                            <label>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={sex === Gender.Other}
                                    onChange={() => handleGenderChange(Gender.Other)}
                                />
                                Other
                            </label>
                        </div>

                    </div>
                </div>
                <button
                    className="mt-10 w-full h-[50px] flex justify-center items-center bg-black text-white cursor-pointer border border-black hover:bg-teal-200 hover:text-black transition duration-500"
                >
                    Create
                </button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default CreateProduct;