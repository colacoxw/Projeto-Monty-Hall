import PortaModel from "../model/porta";

export function criarPortas(qtde: number, portaComPresente: number) : PortaModel[] {
    return Array.from({ length: qtde }, (_, i) => {
        const numero = i + 1
        const temPresente = numero === portaComPresente
        return new PortaModel(numero, temPresente)
    })
}

//Função responsavel por atualizar as portas
export function atualizarPortas(portas: PortaModel[], portaModificada: PortaModel): PortaModel[]{
    return portas.map(portaAtual => {
        //Validar se a porta atual possui o mesmo numero da porta modificada
        const igualAModificada = portaAtual.numero === portaModificada.numero

        //Porta modificada = true
        if(igualAModificada){
            return portaModificada
        } else {
            //Se a porta modificada por aberta, então ele mantem você na porta atual, se não, ele irá desselecionar a porta atual
            return portaModificada.aberta ? portaAtual : portaAtual.desselecionar()
        }
    })
}