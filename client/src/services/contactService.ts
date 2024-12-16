import $api from "@/http";

class ContactService {
    async sendContactMessage(
        to: string,
        from: string,
        firstName: string,
        lastName: string,
        letter: string
    ) {
        try {
            const { data } = await $api.post('http://localhost:5000/api/mail/contact', { 
                to,
                from,
                firstName,
                lastName,
                letter
             }, { withCredentials: true });
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ContactService();