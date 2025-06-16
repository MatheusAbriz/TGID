import { Link } from "react-router-dom";
import { ShoppingCartIcon } from '@heroicons/react/24/solid'

const Header = () =>{
    return(
        <header className="px-5 py-3 flex justify-between bg-(--cor-fundo)">
            <Link to="/"><div className="bg-(--cor-branco) w-10 h-10 rounded-full"></div></Link>

            <nav>
                <ul>
                    <li><Link to="/carrinho"><ShoppingCartIcon className="size-8 fill-(--cor-branco)"/></Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;