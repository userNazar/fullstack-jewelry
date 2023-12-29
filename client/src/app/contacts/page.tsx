import ContactForm from "./ContactForm";

const Page = () => {
    return (
        <div className="container mx-auto mt-20 flex flex-wrap justify-center px-10">
            <div>
                <h2 className="text-3xl font-semibold">Contact us</h2>
                <div className="max-w-[700px] mt-10">
                    Need to get in touch with us? Either fill out the form with your inqury or find the department email you would like to contact below
                </div>
            </div>
            <div>
                <ContactForm />
            </div>
        </div>
    )
}

export default Page;