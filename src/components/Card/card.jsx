import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Card = ({ img, nome, descricao, qtd, qtdSelecionada=1, preco}) =>{
    const navigate = useNavigate()

    const handleClickPai = () =>{
        const currentPath = location.pathname;

        //Se for a página de produto...
        if(currentPath.includes('/produto')){
            const encodedDescricao = encodeURIComponent(descricao);
            const encodedImg = encodeURIComponent(img);
            const encodedNome = encodeURIComponent(nome);

            const url = `/produto/${encodedImg}/${encodedNome}/${encodedDescricao}/${qtd}/${qtdSelecionada}/${preco}`;

            navigate(url, {
                        replace: true,
                        state: { img, nome, descricao, qtd, qtdSelecionada, preco },
                    });
            return window.location.reload()
        }

        navigate(`/produto/:img/:nome/:descricao/:qtd/:qtdSelecionada/:preco`, { state: {img: img, nome: nome, descricao: descricao, qtd: qtd, qtdSelecionada: qtdSelecionada, preco: preco} })

    }

    const handleClickFilho = (e) =>{
        e.stopPropagation()
        let carrinho = JSON.parse(localStorage.getItem('carrinho'))
        // Se o carrinho for nulo ou não for um array, inicializa um array vazio
        if (!Array.isArray(carrinho)) {
            carrinho = [];
        }

        const data = {
            img: img,
            nome: nome,
            descricao: descricao,
            qtd: qtd,
            qtdSelecionada: qtdSelecionada,
            preco: preco
        }

        // Verificando se o item já existe no carrinho
        const itemExistenteIndex = carrinho.findIndex(item => item.nome === data.nome);
            if (itemExistenteIndex !== -1) {
                // Se o item existir, apenas atualiza a quantidade
                carrinho[itemExistenteIndex].qtdSelecionada += data.qtdSelecionada;
            } else {
                // Se o item não existir, adiciona um novo item
                carrinho.push(data);
            }
        localStorage.setItem('carrinho', JSON.stringify(carrinho))

        return alert("Adicionado com sucesso! Vá até o carrinho")

    }

    return(
        <div className="flex flex-col border-2 border-gray-300 w-70 cursor-pointer transition-all duration-500 ease-in-out hover:translate-y-[-8px] hover:shadow-[0_0_10px_#BF895A]" onClick={handleClickPai}>
            <div className="border-b-2 border-(--cor-borda) w-fit">
                <img src={img} alt={nome} className="w-70 h-auto min-h-[240px]"/>
            </div>

            <div className="flex justify-between mt-2 flex-col px-3 pb-3">
                <div className="flex justify-between mb-2">
                    <h1>{nome}</h1>
                    <p>R${preco}</p>
                </div>

                <div className="flex justify-center">
                    <button className="w-full border-(--cor-borda) border-2 rounded-lg py-2 bg-(--cor-fundo) text-(--cor-branco) cursor-pointer transition-all duration-500 ease-in-out hover:opacity-75" onClick={handleClickFilho}>Adicionar ao Carrinho</button>
                </div>
            </div>
        </div>
    )
}

export default Card;