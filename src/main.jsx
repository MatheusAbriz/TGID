import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/css/reset.css'
import './assets/css/variaveis.css'
import Home from './pages/Home/home'
import Produto from './pages/Produto/produto'
import Carrinho from './pages/Carrinho/carrinho'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element = { <Home/> }/>
      <Route path="/produto/:img/:nome/:descricao/:qtd/:qtdSelecionada/:preco" element = { <Produto/> }/>
      <Route path="/carrinho" element = { <Carrinho/> }/>
    </Routes>
  </BrowserRouter>
)
