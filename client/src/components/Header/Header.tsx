import { FaFacebook   } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Header = () => {
    return (
        <div className="flex custom-padding flex-col items-center text-center pt-36">
            <p className="text-2xl text-white custom-p-font">Fedezd fel a könyvek varázslatos világát!</p>
            <h1 className="text-8xl font-bold text-white pb-6 custom-h1-font">LIBRARY</h1>

            <div className="custom-socials flex flex-row items-center space-x-7 pt-1">
                <FaFacebook className="text-4xl text-socials transition cursor-pointer opacity-70 hover:opacity-100" />
                <FaInstagram className="text-4xl text-socials transition cursor-pointer opacity-70 hover:opacity-100" />
                <FaTiktok className="text-4xl text-socials transition cursor-pointer opacity-70 hover:opacity-100" />
            </div>
        </div>
    )
}

export default Header