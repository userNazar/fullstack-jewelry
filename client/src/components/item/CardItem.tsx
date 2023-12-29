import IProduct from "@/interfaces/IProduct";
import Image from "next/image";
import Link from "next/link";
import ButtonAdd from "./ButtonAdd";

interface CardItemProps {
    item: IProduct;
}

const CardItem = ({ item }: CardItemProps) => {
    return (
        <div className="relative m-2 w-[368px] height-[368] group group-hover cursor-pointer">
            <Link href={'/products/' + item._id}>
                <div className="flex flex-col justify-center items-center">
                    <Image className="group-hover:scale-90 transition duration-500" src={'http://localhost:5000/' + item.picture} width={368} height={368} alt={item.name} />
                </div>
            </Link>
            <div className="hidden group-hover:block absolute top-200 w-full z-10 bg-white p-2">
                <Link href={'/products/' + item._id}>
                    <h4 className="hidden group-hover:block text-lg font-semibold pb-5">
                        {item.name}
                    </h4>
                </Link>
                <div className="hidden group-hover:block">
                    <ButtonAdd product={item} />
                </div>
            </div>


        </div>
    )
}

export default CardItem