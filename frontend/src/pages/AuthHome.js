import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import Loader from '../component/Loader'
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

//..
const initialState = {
    title: '',
    body: '',
    dueDate: ''
}
//reducer func for update and adding task
const reducer = (state, action) => {
    switch (action.type) {
        case "title":
            return {
                ...state,
                title: action.payload,
            };
        case 'body':
            return {
                ...state,
                body: action.payload,
            };
        case 'date':
            return {
                ...state,
                dueDate: action.payload
            };
        default:
            return state;
    }
};


//Authentication page
function Auth() {
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [modal, setModal] = useState(false);
    const [modalfor, setModalFor] = useState();
    const [tasksparameters, setTasksParameters] = useState({
        Id: '',
        completed: null,
        mark: ''

    })
    const [incompleted, setIncompleted] = useState([]);
    const [completed, setcompleted] = useState([]);
    const [loader, setLoader] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [startDate, setStartDate] = useState();

    Modal.setAppElement('#root')
    //modal
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    //addTask
    const addTask = async () => {
        console.log(state);
       
        setLoader(false);
        try {
            const response = await axios.post('http://localhost:4000/createTask', state, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setLoader(true);
            fetchTasks();
            toast.info('Task added successfully!')
            history.push('/auth')
        }
        catch (error) {
            toast.error(`${error.response.data.message}`);
            setLoader(true);

        }

    };

    //calling fetchTask 
    useEffect(() => { fetchTasks(); }, []);

    //fetching tasks
    const fetchTasks = async () => {
        setLoader(false);
        try {
            const result = await axios.get("http://localhost:4000/taskByuserId", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setLoader(true);
            setIncompleted(result.data);//incompleted array
            setcompleted(result.data)//completed array
            filter();
        }
        catch (error) {
            toast.error(`${error.response.data.message}`);
            setLoader(true);

        }

    };

    //filtering tasks
    const filter = () => {

        setIncompleted((value) => {

            return value.filter((item) => {
                return item.completed === false
            })
        });
        setcompleted((value) => {
            return value.filter((item) => {
                return item.completed === true
            })
        })
    };

    //changing input state
    const inputevent = (e) => {

        if (e.target.name === 'title') {
        
            dispatch({
                type: 'title',
                payload: e.target.value
            })
        } 
        else  {
           
            dispatch({
                type: 'body',
                payload: e.target.value
            })
        }
    };

    //marking and unmarking of a task
    const markUnmark = async (id, index, isCompleted, markCondition) => {
        let body;
        if (isCompleted) {
            body = {
                completed: false,
                mark: "check_box_outline_blank"
            };
            setLoader(false);
            try {
                const result = await axios.patch(`http://localhost:4000/markTask/${id}`, body, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setLoader(true);
                toast.info('Task marked Incompleted!')
                fetchTasks();
            }
            catch (error) {
                setLoader(true);
                toast.error(`${error.response.data.message}`);

            }
        }
        else {

            body = {
                completed: true,
                mark: 'check_box'
            };
            setLoader(false);
            try {
                const result = await axios.patch(`http://localhost:4000/markTask/${id}`, body, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setLoader(true);
                toast.info('Task completed!')

                fetchTasks();
            }
            catch (error) {
                setLoader(true);
                toast.error(`${error.response.data.message}`)
            }

        }

    }
    //update task nd setting task id's
    const setid = (taskId, isCompleted, mark) => {

        setModalFor(true);
        if (isCompleted) {

            setTasksParameters((pre) => {
                return {
                    ...pre,
                    Id: taskId,
                    completed: isCompleted,
                    mark

                }
            })
        }
        else {
            setTasksParameters((pre) => {
                return {
                    ...pre,
                    Id: taskId,
                    completed: isCompleted,
                    mark
                }
            })
        }

    };

    //updating
    const updateTask = async () => {
        let body;
        if (tasksparameters.completed) {
            body = {
                completed: false,
                mark: "check_box_outline_blank"
            }
        }
        else {
            body = {
                completed: false,
                mark: "check_box_outline_blank"
            }
        }
        setLoader(false);
        try {
            const result = await axios.patch(`http://localhost:4000/updateTask/${tasksparameters.Id}`, { state, body }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setLoader(true);
            setModal(false);
            toast.info('Task updated!')

            fetchTasks();
        }
        catch (error) {
            setModal(false);
            setLoader(true);
            toast.error(`${error.response.data.message}`);
        }
    }

    //delete task
    const deleteTask = async (id) => {
        console.log(id);
        setLoader(false);
        try {
            const result = await axios.delete(`http://localhost:4000/deleteTask/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setLoader(true);
            toast.info('Task deleted!')
            fetchTasks();
        } catch (error) {
            setLoader(true);
            toast.error(`${error.response.data.message}`);
        }
    }

    return (

        <div className='container'>
            {/* delete modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        zIndex: 1,

                    },
                    content: {
                        color: 'orange',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f5f5f5',
                        flexDirection: 'column',
                    }

                }}

            >
                <p style={{ fontWeight: 'bold' }}>Are you sure want to delete ?</p>
                <div  >
                    <button className="btn indigo waves-effect waves-light" style={{ margin: '3px' }} name="action" onClick={() => { closeModal(); }}>Cancel
                    </button>
                    <button className="btn indigo waves-effect waves-light" style={{ margin: '3px' }} name="action" onClick={() => { closeModal(); deleteTask(tasksparameters.Id) }}>OK
                    </button>
                </div>
            </Modal>
            {/* loader */}
            {loader ? <>
                <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <div className='col s12 center m4' style={{ display: 'flex', justifyContent: 'center', margin: '0' }}>
                        <button className='col s10 m6 btn-large waves-effect waves-light indigo ' onClick={() => { setModal(true); setModalFor(false) }} style={{ margin: '0' }}>Add Task </button>
                    </div>
                </div>
                {modal ? <>
                    <div style={{ border: '1px solid whitesmoke', padding: '20px 50px', backgroundColor: 'lavender' }}>
                        <div style={{ marginTop: "20px" }}>
                           Title
                          <input id="first_name" type="text" onChange={inputevent} className="validate" name="title" />
                           Body
                           <input id="last_name" type="text" onChange={inputevent} className="validate" name="body" />
                           Due-date
                        
                          <div><DatePicker selected={startDate} name='date' onChange={(date)=>{
                             setStartDate(date);
                              dispatch({
                                  type:'date',
                                  payload:date
                              })
                          }} /></div>
                        </div>
                        <div >
                            {/*  modal for add/update task */}
                            {modalfor ? <button onClick={() => { updateTask() }} style={{zIndex:'0'}}  className=" btn waves-effect indigo waves-light">Update <i className="material-icons right">send</i></button> : <button className=" btn waves-effect indigo waves-light" style={{zIndex:'0'}} onClick={() => { addTask(); setModal(false); }}>Add <i className="material-icons right">send</i></button>}
                        </div></div>
                </> : null}
                <div className='row incomplete '>
                    <div className='col incomplete1 s12 m4'>
                        <h5 className='grey ' style={{ padding: '10px 20px', borderLeft: '5px solid black', color: 'whitesmoke', textTransform: 'uppercase' }}>Incomplete</h5>
                    </div>
                </div>
                <div className='row ' style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {incompleted.map((item, index) => {
                        return (
                            <>
                                <div className='col incomplete1 s12 m4' id={item._id} >

                                    <div >
                                        <ul className='todo-item collapsible' >
                                            <li key={item.id}> <p style={{ margin: '0', paddng: '0', fontWeight: 'bold' }}>{item.title}</p>
                                                <hr />
                                                <div  ><p style={{ margin: '0 0 0 0', padding: '0' }}>{item.body}</p></div>

                                                <div  ><p style={{ margin: '5px 0 0 0', padding: '0' }}>Due date: {new Date(item.dueDate).toLocaleDateString()}</p></div>

                                                <div style={{ margin: '8px 0 0 0 ' }}>

                                                    <i className="material-icons" style={{ cursor: 'pointer' }} onClick={() => { markUnmark(item._id, index, item.completed, item.mark) }}>{item.mark}</i>
                                                    <span ><i className="material-icons" onClick={() => { setModal(true); setid(item._id, item.completed, item.mark) }} style={{ fontSize: '20px', cursor: "pointer" }} >edit</i> </span>
                                                    <span><i className="material-icons" onClick={() => { setid(item._id, item.completed, item.mark); openModal(); }} style={{ fontSize: '20px', cursor: "pointer" }}>delete</i></span>
                                                </div>
                                            </li>

                                        </ul>

                                    </div>
                                </div>
                            </>
                        )
                    })}

                </div>
                <div className='row complete '>
                    <div className='col complete1 s12 m4'>
                        <h5 className='grey ' style={{ padding: '10px 20px', borderLeft: '5px solid black', color: 'whitesmoke', textTransform: 'uppercase' }}>Completed</h5>
                    </div>
                </div>
                <div className='row ' style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {completed.map((item, index) => {
                        return (
                            <>
                                <div className='col complete1 s12 m4' id={item.id} >
                                    <div >
                                        <ul className='todo-item collapsible' >
                                            <li key={item.id}> <p style={{ margin: '0', paddng: '0', fontWeight: 'bold' }}>{item.title}</p>
                                                <hr />
                                                <div  ><p style={{ margin: '0 0 0 0', padding: '0' }}>{item.body}</p></div>

                                                <div  ><p style={{ margin: '5px 0 0 0', padding: '0' }}>Due date: {new Date(item.dueDate).toLocaleDateString()}</p></div>

                                                <div style={{ margin: '8px 0 0 0 ' }}>

                                                    <i className="material-icons " style={{ cursor: 'pointer' }} onClick={() => { markUnmark(item._id, index, item.completed, item.mark) }}>{item.mark}</i>

                                                    <span ><i className="material-icons" onClick={() => { setModal(true); setid(item._id, item.completed, item.mark) }} style={{ fontSize: '20px', cursor: "pointer" }} >edit</i> </span>
                                                    <span><i className="material-icons" onClick={() => { setid(item._id, item.completed, item.mark); openModal(); }} style={{ fontSize: '20px', cursor: "pointer" }}>delete</i></span>
                                                </div>
                                            </li>

                                        </ul>

                                    </div>
                                </div>
                            </>
                        )
                    })}

                </div>
            </> : <Loader />}
        </div>

    );
};

export default Auth