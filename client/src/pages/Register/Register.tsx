import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const Register = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow mt-52">
                <RegisterForm />
            </div>
            <Footer />
        </div>
    );
}

export default Register;
