import { useEffect, useState } from "react"
import styles from '../../../styles/jogo.module.css'
import Porta from "../../../components/Porta"
import { atualizarPortas, criarPortas } from "../../../functions/portas"
import Link from 'next/link'
import { useRouter }  from "next/router"

export default function Jogo() {
    //Iniciando o useRouter -- Utilizado para pegar o parametro da url
    const router = useRouter()

    //Iniciando o array vazio
    const [portas, setPortas] = useState([])
    const [valido, setValido] = useState(false)

    
    useEffect(() => {
        const portas = +router.query.portas
        const temPresente = +router.query.temPresente

        const qtdePortasValidas = portas >= 3 && portas <= 10
        const temPresenteValido = temPresente >= 1 && temPresente <= portas

        setValido(qtdePortasValidas && temPresenteValido)
    }, [portas])

    //Utilizado quando nós queremos alterar o valor de uma variavel quando ela se modificar
    //Ou seja, so vai ser chamada quando tiver alteração no router.query
    useEffect(() => {
        const portas = +router.query.portas
        const temPresente = +router.query.temPresente
        setPortas(criarPortas(portas, temPresente))
    }, [router?.query])

    //Função para renderizar as portas
    function renderizarPortas() {
        //Retorna o array de portas
        return portas.map(porta => {
            //Retorna uma linha de jsx 
            //onChange - Pegar uma nova porta e modificar ela dentro do array
            return <Porta key={porta.numero} value={porta} onChange={novaPorta => setPortas(atualizarPortas(portas, novaPorta))} />
        })
    }

    return (
        <div id={styles.jogo}>
            <div className={styles.portas}>
                {valido ? renderizarPortas() : <h1>Valores Incorretos</h1>}
            </div>
            <div className={styles.botoes}>
                <Link href={"/"}>
                    <button>Reiniciar Jogo</button>
                </Link>
            </div>
        </div>
    )
}