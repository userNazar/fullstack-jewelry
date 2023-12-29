import CardItem from "@/components/item/CardItem";
import productService from "@/services/productService";

export const revalidate = 0;

async function fetchData() {
  const products = await productService.getAllProducts();

  return products;
}

export default async function Home() {

  const products = await fetchData();

  return (
    <div className="container mx-auto flex flex-wrap justify-center">
      {products &&
        products.map(item => <CardItem key={item.name} item={item} />)
      }
    </div>
  )
}
