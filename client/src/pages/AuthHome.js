import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { changeTitle, changeBody, changeDueDate } from "../data/reducers/TodoReducer";
import {infoToast,errorToast} from "../data/toast/Toasts";
import { createTodoItemAPI, getTodoItemAPI, updateTodoItemAPI, deleteTodoItemAPI, markTodoItemAPI } from '../data/services/TodoServices';
import Loader from '../component/Loader'
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

//Authentication page
function Auth() {
	const history = useHistory();
	const dispatch = useDispatch();
	const taskData = useSelector(state => state.todoReducer).todo;
	const [modal, setModal] = useState(false);
	const [modalfor, setModalFor] = useState();
	const [tasksparameters, setTasksParameters] = useState({
		Id: '',
		completed: null,
		mark: ''
	});
	const [incompleted, setIncompleted] = useState([]);
	const [completed, setcompleted] = useState([]);
	const [loader, setLoader] = useState(false);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [startDate, setStartDate] = useState();


	//modal
	Modal.setAppElement('#root');
	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}


	//addTask
	const addTask = async () => {

		setLoader(false);
		try {
			const response = await createTodoItemAPI(taskData);
			if (response.isSuccessful) {
				setLoader(true);
				fetchTasks();
				infoToast('Task added successfully!')
				history.push('/api/auth');
				setStartDate('');
				dispatch(changeTitle(""));
				dispatch(changeBody(""));
				dispatch(changeDueDate(""));
			}
			else {
				// console.log(response.message.message);
				errorToast(response.message);
				setLoader(true);
			}

		}
		catch (error) {}
	};

	//calling fetchTask 
	useEffect(() => { fetchTasks() }, []);

	//fetching tasks
	const fetchTasks = async () => {
		setLoader(false);
		try {
			const response = await getTodoItemAPI();
			if (response.isSuccessful) {
				setLoader(true);
				setIncompleted(response.data);//incompleted array
				setcompleted(response.data)//completed array
				filter();
			}
			else {
				errorToast(response.message);
				setLoader(true);
			}
		}
		catch (error) {}

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
			dispatch(changeTitle(e.target.value));
		}
		else {
			dispatch(changeBody(e.target.value));
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
				const response = await markTodoItemAPI(body, id);
				if (response.isSuccessful) {
					setLoader(true);
					infoToast('Task marked Incompleted!')
					fetchTasks();
				}
				else {
					setLoader(true);
					errorToast(response.message);
				}
			}
			catch (error) { }
		}
		else {

			body = {
				completed: true,
				mark: 'check_box'
			};
			setLoader(false);
			try {
				const response = await markTodoItemAPI(body, id);
				if (response.isSuccessful) {
					setLoader(true);
					infoToast('Task completed!')
					fetchTasks();
				}
				else {
					setLoader(true);
					errorToast(response.message)
				}

			}
			catch (error) { }
		}

	}

	//update task nd setting task parameters
	const setid = (taskId, isCompleted, mark, title, body) => {

		setModalFor(true);

		//setting task parameters
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
		setLoader(false);
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

		try {
			const response = await updateTodoItemAPI({ taskData, body }, tasksparameters.Id)
			if (response.isSuccessful) {
				setLoader(true);
				setModal(false);
				infoToast('Task updated!')
				fetchTasks();
				setStartDate('');
				dispatch(changeTitle(""));
				dispatch(changeBody(""));
				dispatch(changeDueDate(""));
			}
			else {

				setModal(false);
				setLoader(true);
				errorToast(response.message);
			}

		}
		catch (error) { };
	}

	//delete task
	const deleteTask = async (id) => {

		setLoader(false);
		try {
			const response = await deleteTodoItemAPI(id);
			if (response.isSuccessful) {
				setLoader(true);
				infoToast('Task deleted!')
				fetchTasks();
			}
			else {
				setLoader(true);
				errorToast(response.message);
			}
		}
		catch (error) { };
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
						<button className='col s10 m6 btn-large waves-effect waves-light indigo ' onClick={() => {
							setModal(true); setModalFor(false);

						}} style={{ margin: '0' }}>Add Task </button>
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

                          <div><DatePicker selected={startDate} onChange={(date) => {
								setStartDate(date);
								dispatch(changeDueDate(date));
							}} /></div>
						</div>
						<div >
							{/*  modal for add/update task */}
							{modalfor ? <button onClick={() => { updateTask() }} style={{ zIndex: '0' }} className=" btn waves-effect indigo waves-light">Update <i className="material-icons right">send</i></button> : <button className=" btn waves-effect indigo waves-light" style={{ zIndex: '0' }} onClick={() => { addTask(); setModal(false); }}>Add <i className="material-icons right">send</i></button>}
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
													<span ><i className="material-icons" onClick={() => {
														setModal(true); setid(item._id, item.completed, item.mark, item.title, item.body);
													}} style={{ fontSize: '20px', cursor: "pointer" }} >edit</i> </span>
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