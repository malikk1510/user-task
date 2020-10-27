import React, { useReducer } from 'react';
// import { AuthContext } from '../contexts/authContext'
import { completed, incompleted } from '../data'
import axios from 'axios'

const initialState = {
    title: '',
    body: '',
    dueDate: ''
}

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
                dueDate: action.payload,
            };
        default:
            return state;
    }
};

function Auth() {

    const [state, dispatch] = useReducer(reducer, initialState);

    const inputevent = (e) => {

        if (e.target.name === 'title') {
            dispatch({
                type: 'title',
                payload: e.target.value
            })
        } else if (e.target.name === 'body') {
            dispatch({
                type: 'body',
                payload: e.target.value
            })
        } else {
            dispatch({
                type: 'date',
                payload: e.target.value
            })
        }
    };

    const addTask = async () => {
        console.log(state);

        try {
            const response = await axios.post('http://localhost:4000/createTask', state, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("ok");
            console.log(response.data);
        } catch (err) {
            console.log("error");
            console.log(err);
        }

    };

    const markTask = (id) => {
        console.log(id);
    }

    return (

        <div className='container'>
            {/* Modal Structure start*/}
            <div id="modal1" className="modal" >
                <div className="modal-content ">
                    Title
                    <input onChange={inputevent} id="first_name" type="text" className="validate" name="title" />
                   Body
                    <input onChange={inputevent} id="last_name" type="text" className="validate" name="body" />
                    dueDate
                   <input onChange={inputevent} type="text" className="validate" name='date' />
                </div>
                <div className="modal-footer">
                    <button className="modal-close btn waves-effect indigo waves-light" onClick={addTask}>Submit <i class="material-icons right">send</i></button>
                </div>
            </div>
            {/* Modal Structure  end*/}
            <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <div className='col s12 center m4' style={{ display: 'flex', justifyContent: 'center', margin: '0' }}>
                    <button data-target="modal1" className='col s10 m6 btn-large waves-effect waves-light indigo modal-trigger' style={{ margin: '0' }}>Add Task </button>
                </div>
            </div>
            <div className='row incomplete '>
                <div className='col incomplete1 s12 m4'>
                    <h5 className='grey ' style={{ padding: '10px 20px', borderLeft: '5px solid black', color: 'whitesmoke', textTransform: 'uppercase' }}>Incomplete</h5>
                </div>
            </div>
            <div className='row ' style={{ display: 'flex', flexWrap: 'wrap' }}>

                {incompleted.map((item, index) => {
                    return (
                        <>
                            <div className='col incomplete1 s12 m4' id={item.id} >
                                <div >
                                    <ul className='todo-item collapsible' >
                                        <li key={item.id}> <p className='collapsible-header' style={{ margin: '0', paddng: '0', fontWeight: 'bold' }}>{item.title}</p>
                                            <div className='collapsible-body' ><p style={{ margin: '0 0 0 7px', padding: '0' }}>{item.body}</p></div>
                                            <div className='collapsible-header' ><p style={{ margin: '0', padding: '0' }}>Due date: {item.date}</p></div>
                                            <div style={{ margin: '8px 0 0 14px ' }}> <span ><i className="material-icons" onClick={() => { markTask(item.id); }} style={{ fontSize: '20px', cursor: "pointer" }} >edit</i> </span>
                                                <span><i className="material-icons" style={{ fontSize: '20px', cursor: "pointer" }}>delete</i></span>
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
                {completed.map((item) => {
                    return (
                        <>
                            <div className='col complete1 s12 m4' id={item.id} >
                                <div >
                                    <ul className='todo-item collapsible' >
                                        <li key={item.id}> <p className='collapsible-header' style={{ margin: '0', paddng: '0', fontWeight: 'bold' }}>{item.title}</p>
                                            <div className='collapsible-body' ><p style={{ margin: '0 0 0 7px', padding: '0' }}></p>{item.body}</div>
                                            <div className='collapsible-header' ><p style={{ margin: '0', padding: '0' }}></p>Due date:{item.date}</div>
                                            <div style={{ margin: '8px 0 0 14px ' }}> <span ><i className="material-icons" onClick={() => { markTask(item.id); }} style={{ fontSize: '20px', cursor: "pointer" }} >edit</i> </span>
                                                <span><i className="material-icons" style={{ fontSize: '20px', cursor: "pointer" }}>delete</i></span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )
                })}

            </div>
        </div>

    );
};

export default Auth