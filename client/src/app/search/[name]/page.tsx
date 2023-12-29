import CardItem from "@/components/item/CardItem";
import productService from "@/services/productService";

interface PageProps {
    params: { name: string };
}

async function fetchData(name: string) {
    const product = await productService.getFilteredProduct(name);
    return product;
}

const Page = async ({ params }: PageProps) => {
    
    const products = await fetchData(params.name);

    return (
        <div className="container mx-auto flex flex-wrap justify-center">
            
            { products?.length === 0  &&
                <p className="pt-20 text-2xl text-gray-400">No Elements</p>
            }
            {
                products?.map(prod => <CardItem key={prod._id} item={prod} />)
            }
        </div>
    )
}

export default Page