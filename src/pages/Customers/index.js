import './customer.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiUsers} from 'react-icons/fi';
import { useState } from 'react';
import {db} from '../../services/firebaseConnection';
import {addDoc, collection} from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function Customers(){
    const [empresa, setEmpresa] = useState('');
    const [cpnj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleRegister(e){
        e.preventDefault();

        if(empresa !== '' && cpnj !== '' && endereco !== ''){
            await addDoc(collection(db, "customers"),{
                nomeFantasia: empresa,
                cpnj: cpnj,
                endereco: endereco
            })
            .then(() =>{
                setEmpresa('');
                setCnpj('');
                setEndereco('');
                toast.success("Cliente cadastrado com sucesso!");
            })
            .catch((error)=>{
                console.log("Erro ao cadastrar o customer: ", error);
                toast.error("Erro ao realizar o cadastro do cliente!");
                
            })
        }else{
            toast.warning("Favor preencher todos os campos!");
        }
    }
    return(
        <div>
           <Header />
           <div className='content'>
            <Title name={"Clientes"}>
                <FiUsers size={25}/>
            </Title>

            <div className='container'>
                <form className='form-profile' onSubmit={handleRegister}>
                    <label>Nome fantasia: </label>
                    <input type='text' placeholder='Nome da empresa' value={empresa} onChange={(e) => setEmpresa(e.target.value) } />
                
                    <label>Cnpj: </label>
                    <input type='text' placeholder='Digite o CNPJ da empresa' value={cpnj} onChange={(e) => setCnpj(e.target.value) } />
                  
                    <label>Endereço: </label>
                    <input type='text' placeholder='Digite o endereço da empresa' value={endereco} onChange={(e) => setEndereco(e.target.value) } />
                
                    <button type='submit'>
                        Salvar
                    </button>
                </form>
            </div>

           </div>
        </div>
    )
}