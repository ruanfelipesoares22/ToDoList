import { use, useState } from "react"
import Button from "./components/Button"

export default function App(){
  const [listaTarefas, setListaTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [feita, setFeita] = useState(false);
  

  function adicionar(){
    if(descricao == ""){
      return;
    }

    const tarefa = {
      "id": listaTarefas.length + 1,
      descricao,
      feita 
    }

    setListaTarefas([...listaTarefas, tarefa]);
    setDescricao("");
    setFeita(false)


    console.log(listaTarefas);
    
  }

  function removerItem(indiceTarefa){
    const listaFiltrada = listaTarefas.filter(item => item.id != indiceTarefa);
    setListaTarefas(listaFiltrada);
    }

  function mudarStatus(indiceTarefa){
    const listaTarefaAtualizada = listaTarefas.map(tarefa => {
      if(tarefa.id == indiceTarefa){

        return {...tarefa, feita: !tarefa.feita };
      }

      return tarefa

     
    })
     setListaTarefas(listaTarefaAtualizada);
  }
  return(
    <div>
      <h1>ToDoList - Bloco do Ruanzinho</h1>
        <div>
          <label htmlFor="descricao">Descricao da atividade</label>
          <input id="descricao" type="text" value={descricao} onChange={e => setDescricao(e.target.value)}></input>
        </div>

        <Button funcao={adicionar} btnText="Adicionar" />
        <div>
            <h2>Tarefas</h2>
            {listaTarefas.map(item=>(
              <div key={item.id}>
                <p>Descricao: {item.descricao}</p>
                <label>
                  <input type="checkbox" checked={item.feita} btn="Realizada" onChange={() => mudarStatus(item.id)}/>
                Realizada
                </label>     
                <Button funcao={() => removerItem(item.id)} btnText="Remover" />
              </div>
            ))}
        </div>
    </div>
  )

}