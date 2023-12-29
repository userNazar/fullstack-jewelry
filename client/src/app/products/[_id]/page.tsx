import productService from "@/services/productService";
import Image from "next/image";
import { redirect } from "next/navigation";
import { SlPaypal } from "react-icons/sl";
import { TbTruckDelivery } from "react-icons/tb";
import AddButtonCart from "./AddButtonCart";
import AddButtonWish from "./AddButtonWish";
import DeleteBtn from "./DeleteBtn";
import BackBtn from "./BackBtn";


interface PageProps {
    params: { _id: string };
}

async function fetchData(_id: string) {
    const product = await productService.getOneProduct(_id);
    return product;
}

async function Page({ params }: PageProps) {

    const product = await fetchData(params._id);

    if (!product) {
        redirect('/')
    }

    return (
        <div className="container mx-auto mt-20 px-4">
            <div className="max-w-[1200px] mx-auto">
                <BackBtn />
                <div className="flex justify-end">
                    <DeleteBtn _id={product._id} />
                </div>
            </div>
            <div className="flex flex-wrap xl:justify-around justify-center">
                <div className="px-4 mt-5">
                    <Image src={'http://localhost:5000/' + product?.picture} width={400} height={400} alt={product?.name || ''} />
                </div>
                <div className="lg:w-[400px] px-4 mt-5">
                    <h2 className="font-bold text-2xl">{product?.name}</h2>
                    <p className="mt-2">in <span className="font-semibold">{product?.metalColor}</span></p>
                    <AddButtonWish product={product} />
                    <div className="flex mt-5 justify-center sm:justify-between items-center border-b border-black"></div>
                    <p className="flex items-center mt-5">
                        <TbTruckDelivery className="mr-2" size={20} />
                        <span>
                            Complimentary Shipping & Returns
                        </span>
                    </p>
                    <div className="flex mt-5 justify-center sm:justify-between items-center border-b border-black"></div>
                    <AddButtonCart product={product} />
                    <p className="flex items-center mt-3 font-semibold">
                        <span className="mr-1">
                            Buy now and pay later with
                        </span>
                        <SlPaypal />
                    </p>
                    <div className="flex mt-5 justify-center sm:justify-between items-center border-b border-black"></div>
                    <p className="mt-2">In stock: {product?.stock ? <span className="text-green-500 ml-2 font-bold">Yes</span> : <span className="text-red-500 ml-2 font-bold">No</span>}</p>
                    <p className="mt-2">Weight: <span className="ml-2 font-bold">{product?.weight} g.</span></p>
                    <p className="mt-2">Country: <span className="ml-2 font-bold">{product?.country}</span></p>
                    <p className="mt-2">Series: <span className="ml-2 font-bold">{product?.series}</span></p>
                    <p className="mt-2">Metal Color: <span className="ml-2 font-bold">{product?.metalColor}</span></p>
                    {product?.name.includes('Ring') &&
                        <div>
                            <p>Ring Width: <span className="ml-2 font-bold">{product?.ringWidth}</span></p>
                            <p>Ring Design: <span className="ml-2 font-bold">{product?.ringDesign}</span></p>
                        </div>
                    }
                    <p className="mt-2">Gender: <span className="ml-2 font-bold">{product?.sex}</span></p>
                    <div className="flex mt-5 justify-center sm:justify-between items-center border-b border-black"></div>
                </div>
            </div>
        </div>
    )
}

export default Page