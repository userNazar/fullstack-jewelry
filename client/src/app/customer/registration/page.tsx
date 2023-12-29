import Link from "next/link";
import FormRegister from "./FormRegister";
import Image from 'next/image'
import { IoIosArrowForward } from "react-icons/io";

const Page = () => {
  return (
    <div className="container mx-auto flex justify-center mt-20 px-5">
      <div>
        <h2 className="text-4xl">Create an Account</h2>
        <p className="max-w-[400px] mt-5">With a Tiffany.com account, you can save time during checkout, access your shopping bag from any device and view your order history.</p>
        <div className="font-semibold mt-5">
          Have an account?
          <Link className="ml-4 font-medium text-sm transition duration-300 ease-in-out hover:text-teal-500" href="/customer/login">Sing in <IoIosArrowForward className="inline" /></Link>
        </div>
        <FormRegister />
      </div>
      <div className="hidden sm:block ml-10">
        <Image
          src="/static/blue-box.jpg"
          width={600}
          height={600}
          alt="Picture of the author"
        />
      </div>
    </div>
  )
}

export default Page