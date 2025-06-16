import linkedin from '../../assets/img/linkedin-img.svg'
import github from '../../assets/img/github-img.svg'
import { Link } from 'react-router-dom'

const Footer = () =>{
    return(
        <footer className="px-5 py-3 flex justify-between bg-(--cor-fundo) items-center max-[675px]:flex-col">
            <h1 className="text-(--cor-branco) text-lg">Desenvolvido por Matheus Abriz</h1>
            <h1 className="text-(--cor-branco) text-lg">Teste prático - TGID</h1>

            <div className="container-redes flex gap-x-4">
                <Link to="https://github.com/MatheusAbriz" className="transition-all duration-500 ease-in-out hover:translate-y-[-4px]"><img src={github} alt="icone github" className="max-w-[40px] max-h-[40px]"/></Link>
                <Link to="https://www.linkedin.com/in/matheus-abriz/" className="transition-all duration-500 ease-in-out hover:translate-y-[-4px]"><img src={linkedin} alt="icone linkedin" className="max-w-[40px] max-h-[40px]"/></Link>
            </div>
        </footer>
    )
}

export default Footer;