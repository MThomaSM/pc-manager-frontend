import {useDispatch} from "react-redux";
import {usePathname, useRouter} from "next/navigation";
import {uiActions} from "@/store/ui-slice";
import {FaFacebook, FaInstagram, FaXTwitter} from "react-icons/fa6";

const Footer = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const updatePage = (page: string) => {
        if(pathname !== "/"){
            router.push("/");
        }
        dispatch(uiActions.setPage({
            page
        }));
    }

    return (
      <footer className="static w-full bg-gradient-to-r from-blue-500 to-blue-800 text-white bottom-0 flex flex-col items-center justify-center py-12">
          <div className="flex flex-col items-center justify-center container gap-2 px-3 md:px-0">
              <a href="#" className="font-bold text-2xl lg:text-4xl">
                  PCREMOTE
              </a>
              <div className="text-gray-300 pt-2 space-x-4 font-light">
                  <a onClick={updatePage.bind(this, "about")} className="text-lg hover:font-normal hover:text-gray-100 transition-all hover:cursor-pointer">About</a>
                  <a onClick={updatePage.bind(this, "features")} className="text-lg hover:font-normal hover:text-gray-100 transition-all hover:cursor-pointer">Features</a>
                  <a onClick={updatePage.bind(this, "pricing")} className="text-lg hover:font-normal hover:text-gray-100 transition-all hover:cursor-pointer">Pricing</a>
                  <a onClick={updatePage.bind(this, "faq")} className="text-lg hover:font-normal hover:text-gray-100 transition-all hover:cursor-pointer">FAQ</a>
              </div>
              <div className="flex flex-row text-sm text-gray-300 justify-between items-center border-t-2 w-full mt-2 pt-2 border-gray-400">
                  <p>2023 By Tomáš Magnes</p>
                  <div className="flex flex-row justify-evenly gap-x-1 items-center text-xl">
                      <FaFacebook />
                      <FaInstagram />
                      <FaXTwitter />
                  </div>
              </div>
          </div>
      </footer>
  )
}

export default Footer;