import { motion } from "framer-motion";

const Home = () =>{
    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}>

                <h1 className="text-red-600">Olá</h1>
        </motion.div>
    )
}

export default Home;