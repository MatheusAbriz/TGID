import { motion } from "framer-motion";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { TrashIcon } from '@heroicons/react/24/solid'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react";

const Carrinho = () =>{
    const [itens, setItens] = useState(JSON.parse(localStorage.getItem('carrinho')) || []);
    const [ precoTotal, setPrecoTotal ] = useState(0)

    //Calculando o preço sempre que os itens mudarem
    const calcularPrecoTotal = () =>{
        const total = itens.reduce((acc, item) => acc + (item.preco * item.qtdSelecionada), 0)
        setPrecoTotal(total)
    }

    useEffect(() =>{
        calcularPrecoTotal()
    }, [itens])

    //Atualizando a quantidade de um item e recalculando o preço
    const handleQuantidadeChange = (index, novaQtd) => {
        const novosItens = [...itens];
        novosItens[index].qtdSelecionada = novaQtd;
        setItens(novosItens);
        localStorage.setItem('carrinho', JSON.stringify(novosItens))
    };

    //Remove um item do carrinho
    const handleRemoveItem = (nome) =>{
        const novosItens = itens.filter((item) => item.nome !== nome); 
        setItens(novosItens); 
        localStorage.setItem('carrinho', JSON.stringify(novosItens)); 
    }

    //Finalizar compra
    const handleFinalizarCompra = () =>{
        localStorage.removeItem('carrinho')
        alert("Compra finalizada com sucesso! Volte para a página inicial caso queira comprar mais...");
    }

    //Componente de select
        const SelectDemo = ({qtd, qtdNormal, index}) =>{
        const [ qtdSelecionada, setQtdSelecionada ] = useState(qtdNormal)

        const handleSelectChange = (value) => {
            const novaQtd = parseInt(value);
            setQtdSelecionada(novaQtd);
            handleQuantidadeChange(index, novaQtd);
        };

            return(
                <Select value={qtdSelecionada} onValueChange={handleSelectChange} onChild>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={qtdSelecionada}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="max-h-50">
                            <SelectLabel>Quantidade</SelectLabel>
                            {Array.from({length: qtd}, (_, index) =>(
                                <SelectItem  key={index} value={index + 1}>{index + 1}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )
        }

    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="flex flex-col min-h-screen">
                <Header/>
                
                <section className="flex px-5 py-10 justify-center gap-x-30 flex-1 max-[1200px]:flex-col max-[1200px]:justify-start max-[1200px]:items-center max-[1200px]:gap-y-6">
                    <div className="border-2 border-gray-300 shadow-[0_0_10px_#CCC] rounded-xl px-4 py-4 flex flex-col justify-center h-fit">
                        {itens.map((item, index) =>(<>
                            <div key={index} className="px-4 py-4 flex items-center gap-x-8 max-[580px]:flex-col max-[580px]:gap-y-4">
                                <img src={item.img} alt={item.descricao} className="w-30 h-30"/>

                                <div className="flex flex-col items-start gap-y-2">
                                    <h1 className="text-xl">{item.nome}</h1>

                                    <div className="flex gap-x-2 justify-center items-center">
                                        <SelectDemo qtd={item.qtd} qtdNormal={item.qtdSelecionada} index={index}/>
                                        <TrashIcon className="w-6 h-6 fill-(--cor-fundo) cursor-pointer" onClick={() => handleRemoveItem(item.nome)}/>
                                    </div>
                                    
                                </div>
                                

                                <div className="flex flex-col">
                                    <p className="text-xs text-green-500 ml-1">{Math.floor(((item.preco / 2) * 100) / item.preco)}% OFF</p>
                                    <p className="text-gray-600"><s>R$ {item.preco * 2}</s></p>
                                    <p>R$ {item.preco}</p>
                                </div>
                                
                            </div>

                            <div className="flex justify-between mb-2">
                                    <h1>Frete</h1>
                                    <h1 className="text-green-500">Grátis</h1>
                                </div>
                            <hr className="border-b-1 border-gray-400 w-full"/>
                            
                            </>
                        ))}
                    </div>

                    <div className="border-2 border-gray-300 shadow-[0_0_10px_#CCC] rounded-xl px-4 py-4 flex flex-col gap-y-2 h-fit w-90">
                        <h1 className="text-xl">Resumo da compra</h1>
                        <hr className="border-b-1 border-gray-400 w-full"/>

                        <div className="flex justify-between items-center">
                            <h1 className="text-lg">Produtos ({itens.length})</h1>
                            <h1>R$: {precoTotal.toFixed(2)}</h1>
                        </div>

                        <div className="flex justify-between items-center">
                            <h1>Frete</h1>
                            <h1 className="text-green 500">Grátis</h1>
                        </div>

                        <hr className="border-b-1 border-gray-400 w-full"/>

                        <div className="flex justify-between items-center">
                            <h1>Total</h1>
                            <h1>R$ {precoTotal}</h1>
                        </div>

                        <button className="w-full border-(--cor-borda) border-2 rounded-lg py-2 bg-(--cor-fundo) text-(--cor-branco) cursor-pointer transition-all duration-500 ease-in-out hover:opacity-75" onClick={handleFinalizarCompra}>Finalizar Compra</button>
                    </div>

                </section>

                <Footer/>

            </motion.div>
    )
}

export default Carrinho;