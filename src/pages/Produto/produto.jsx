import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import Card from "../../components/Card/card";
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useFetch from '../../hooks/useFetch'

const Produto = () =>{
    //Opcao selecionada dentro do select
    const [ qtdSelecionada, setQtdSelecionada ] = useState(1)

    //Componente de select
    const SelectDemo = () =>{
        return(
            <Select onValueChange={(e) => setQtdSelecionada(e)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={qtdSelecionada} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup className="max-h-50">
                        <SelectLabel>Quantidade</SelectLabel>
                        {Array.from({length: dataProduto.qtd}, (_, index) =>(
                            <SelectItem  key={index} value={index + 1}>{index + 1}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        )
    }
    
    //Component de carousel
    const CarouselDemo = () =>{
        return(
            <Carousel className="w-full">
                <CarouselContent className="mx-auto">
                    {data.map((item) => (
                        <CarouselItem key={item.id} className="2xl:basis-1/5 md:basis-1/3 sm:basis-1/2"><Card key={item.id} img={item.img_produto} nome={item.nome_produto} descricao={item.descricao_produto} qtd={item.qtd_produto} preco={item.preco_produto}/></CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        )
    }
    

    //Criando o data/error/loading para armazenar os dados do custom hook useFetch(importando dados da API)
    const { data, error, loading } = useFetch('http://localhost:3000/produtos')
    if(error){
        console.log(error)
    }

    const location = useLocation()
    const [ dataProduto, setDataProduto ] = useState({
        id: 1,
        img: decodeURIComponent(location.state.img),
        nome: decodeURIComponent(location.state.nome),
        descricao: decodeURIComponent(location.state.descricao) ,
        qtd: location.state.qtd,
        qtdSelecionada: location.state.qtdSelecionada,
        preco: decodeURIComponent(location.state.preco)
    })


    const handleClick = () =>{
        let carrinho = JSON.parse(localStorage.getItem('carrinho'))
        // Se o carrinho for nulo ou não for um array, inicializa um array vazio
        if (!Array.isArray(carrinho)) {
            carrinho = [];
        }
            const data = {
                img: dataProduto.img,
                nome: dataProduto.nome,
                descricao:dataProduto.descricao,
                qtd: dataProduto.qtd,
                qtdSelecionada: qtdSelecionada,
                preco: dataProduto.preco
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

            //Se já existir itens no carrinho...
            localStorage.setItem('carrinho', JSON.stringify(carrinho))

            return alert("Adicionado com sucesso! Vá até o carrinho")
    }

    return(<motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="flex flex-col min-h-screen">
                
                <Header/>
                <section className="flex px-5 py-10 justify-center flex-1 gap-x-50 max-[860px]:flex-col items-center">
                    <div className="">
                        <img src={dataProduto.img} alt={dataProduto.nome} className="w-full 2xl:max-w-80 h-auto"/>
                    </div>

                    <div className="border-2 border-gray-300 shadow-[0_0_10px_#CCC] rounded-xl px-4 py-4 flex flex-col max-h-102">
                        <div>
                            <h1 className="font-medium text-2xl mb-2">{dataProduto.nome}</h1>
                            <p className="w-80">{dataProduto.descricao}</p>
                        </div>
                        
                        <div className="relative mt-2 flex flex-col">
                            <p className="text-gray-600"><s>{dataProduto.preco * 2}</s></p>
                            <p className="text-2xl">R$ {dataProduto.preco} <span className="text-sm absolute text-green-500 ml-1">{Math.floor(((dataProduto.preco / 2) * 100) / dataProduto.preco)}% OFF</span></p>
                        </div>

                        <div className="flex flex-col gap-y-2 mt-2">
                            <h1>Estoque disponível</h1>
                            <p>Quantidade: {qtdSelecionada}</p>
                            <SelectDemo/>
                        </div>

                        <div className="flex flex-col gap-y-2 mt-4">
                            <button className="w-full border-(--cor-borda) border-2 rounded-lg py-2 bg-(--cor-fundo) text-(--cor-branco) cursor-pointer transition-all duration-500 ease-in-out hover:opacity-75" onClick={handleClick}>Adicionar ao Carrinho</button>
                        </div>
                    </div>

                </section>
                
                <hr className="border-b-1 border-gray-400"/>
                <section className="flex flex-2 px-5 py-10 flex-col justify-center items-start">
                    <h1 className="mb-2 text-2xl">Outros Produtos</h1>

                    {loading && (<div>Carregando...</div>)}
                    {data && (
                        <CarouselDemo/>
                    )}
                </section>

                <Footer/>
        </motion.div>

    )
}

export default Produto;