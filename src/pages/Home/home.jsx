import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import useFetch from '../../hooks/useFetch'
import Card from "../../components/Card/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { motion } from "framer-motion";
import { useState } from "react";

const Home = () =>{
    //Criando o data/error/loading para armazenar os dados do custom hook useFetch(importando dados da API)
    const { data, error, loading } = useFetch('http://localhost:3000/produtos')
    if(error){
        console.log(error)
    }

    //Criando paginacao
    const linhasPorPagina = 12;
    const [ comecoIndex, setComecoIndex ] = useState(0)
    const [ finalIndex, setFinalIndex ] = useState(linhasPorPagina)

    const Paginacao = () =>{
        const totalDeItens = data ? data.length : 0;
        const isPaginaAnteriorDesabilitada = comecoIndex === 0;
        const isPaginaProximaDesabilitada = finalIndex >= totalDeItens;

        return(
            <Pagination  className="mb-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                        className={isPaginaAnteriorDesabilitada ? "pointer-events-none opacity-50" : undefined }
                        onClick={() => {
                            if(comecoIndex > 0){
                                setComecoIndex(comecoIndex - linhasPorPagina);
                                setFinalIndex(finalIndex - linhasPorPagina);
                            }
                        }}/>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationNext
                        className={isPaginaProximaDesabilitada ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        onClick={() =>{
                            if (finalIndex < totalDeItens) {
                                setComecoIndex(comecoIndex + linhasPorPagina);
                                setFinalIndex(finalIndex + linhasPorPagina);
                            }
                        }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        )
    }

    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            >


                <Header/>
                <section className="grid grid-cols-4 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-items-center items-center gap-x-5 gap-y-5 px-5 py-10 flex-1 max-[675px]:grid-cols-1">
                    {loading && (<div>Carregando...</div>)}
                    {data && data.slice(comecoIndex, finalIndex).map((item) => (
                        <Card key={item.id} img={item.img_produto} nome={item.nome_produto} descricao={item.descricao_produto} qtd={item.qtd_produto} preco={item.preco_produto}/>
                    ))}
                </section>
                <Paginacao/>

                <Footer/>
        </motion.div>
    )
}

export default Home;