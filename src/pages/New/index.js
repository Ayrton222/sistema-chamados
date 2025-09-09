import './new.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import {FiPlusCircle} from 'react-icons/fi';
import { useState, useEffect, useContext } from 'react';
import {AuthContext} from '../../contexts/auth';
import {db} from '../../services/firebaseConnection';
import {collection, getDocs, getDoc, doc, addDoc, updateDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const listRef = collection(db,"customers");

export default function New(){
    const [customers, setCustomers] = useState([]);
    const [loadCustomer, setLoadCustomer] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);
    const [complemento, setComplemento] = useState('');
    const [assunto, setAssunto] = useState("Suporte");
    const [status, setStatus] = useState("Aberto");
    const {user} = useContext(AuthContext);
    const {id} = useParams();
    const [idCustomer, setIdCustomer] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{
        async function loadCustomers() {
            const querySnapshot = await  getDocs(listRef)
            .then((snapshot) =>{
                let lista = [];
                snapshot.forEach((doc) =>{
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                });

                if(snapshot.docs.size === 0){
                    console.log("Nenhum empresa encontrada");
                    toast.warning("Nenhum cliente encontrada!");
                    setCustomers([{ id: '1', nomeFantasia: 'Freela'}]);
                      setLoadCustomer(false);
                      return;
                }

                setCustomers(lista);
                setLoadCustomer(false);

                if(id){
                    loadId(lista);
                }
            })
            .catch((error) =>{
                console.log("Erro ao realizar a consulta dos customers: ", error);
                toast.error("Erro ao realizar a consulta dos clientes!");
                setLoadCustomer(false);
                setCustomers([{ id: '1', nomeFantasia: 'Freela' }]);
            })
        }
        loadCustomers();
    },[id]);

    async function loadId(lista) {
        const docRef = doc(db, "chamados", id);
        await getDoc(docRef)
        .then((snapshot) =>{
            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento);

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
            setCustomerSelected(index);
            setIdCustomer(true);
        })
        .catch((error) =>{
            console.log("Erro ao buscar o chamado para editar:", error);
            toast.error("Erro ao acessar o chamado para editar!");
            setIdCustomer(false);
        })
    }

    function handleOptionChange(e){
        setStatus(e.target.value);
    }

    function handleChangeSelect(e){
        setAssunto(e.target.value);
    }

    function handleChangeCustomer(e){
        setCustomerSelected(e.target.value);
    }

    async function handleRegister(e) {
        e.preventDefault();

        if(idCustomer){
            const docRef = doc(db, "chamados", id);
            await updateDoc(docRef, {
                cliente: customers[customerSelected].nomeFantasia,
                clienteId: customers[customerSelected].id,
                assunto: assunto,
                complemento: complemento,
                status: status,
                userId: user.uid,
            })
            .then(() =>{
                toast.success("Chamado atualizado com sucesso!");
                setComplemento('');
                setCustomerSelected(0);
                navigate('/dashboard');
            })
            .catch((error) =>{
                toast.error("Erro ao atualizar o chamado!");
                console.log("Erro ao atualizar o chamado: " , error);
            })
            return;
        }

        await addDoc(collection(db,"chamados"),{
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            complemento: complemento,
            status: status,
            userId: user.uid,
        })
        .then(() =>{
            toast.success("Chamado registrado com sucesso");
            setComplemento('');
            setCustomerSelected(0);
        })
        .catch((error) =>{
            toast.error("Erro ao realizar o cadastro do chamado!");
            console.log("Erro ao realizar o cadastro do chamado: " , error);
        })
    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="Novo chamado">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Clientes</label>
                       {
                        loadCustomer ? (
                            <input type='text' disabled={true} value="Carregando..."/>
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomer}>
                                {
                                    customers.map((item,index) =>{
                                        return(
                                            <option key={index} value={index}>
                                                {item.nomeFantasia}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        )
                       }

                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input type='radio' name='radio' value="Aberto" onChange={handleOptionChange} checked={status === 'Aberto'}/>
                            <span> Em aberto</span>

                             <input type='radio' name='radio' value="Progresso" onChange={handleOptionChange} checked={status === 'Progresso'}/>
                            <span>Progresso</span>

                             <input type='radio' name='radio' value="Atendido" onChange={handleOptionChange} checked={status === 'Atendido'}/>
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea type='text' placeholder='Descreva seu problema (opcional).' value={complemento} onChange={(e) => setComplemento(e.target.value)}/>

                        <button type='submit'>Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}