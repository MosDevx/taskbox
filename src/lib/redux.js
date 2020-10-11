//  The implementation from the tutorial -- it implements some good closure  example soo its goig to sink in 

import { createStore } from 'redux';

//? Actions
export const actions = {
	ARCHIVE_TASK:'ARCHIVE_TASK',
	PIN_TASK:'PIN_TASK',
};

//? Action Creators
export const archiveTask = id => ({type: actions.ARCHIVE_TASK, id});
export const pinTask = id => ({type:actions.PIN_TASK, id});

//? Reducers

//first a closure function that shall be used in the actual reducer
// so closures are good at decomposing fuctions to receive args that are a independent

//
function taskStateReducer(taskState){
	return (state, action) =>{
		return {
			...state,
			tasks: state.tasks.map(task => 
				task.id === action.id ? {...task , state:taskState} : task
			),
		}
	}
}
function togglePinReducer(state,action){
		return {
			...state,
			tasks: state.tasks.map(task => {
				if(task.id === action.id){
					let newTaskState = task.state === 'TASK_INBOX' ? 'TASK_PINNED' : 'TASK_INBOX'
					return {...task, state:newTaskState}
				}
				else{
					return	task}
			}
			),
		
	}
	
}

export const reducer = (state,action) =>{
	switch (action.type){
		case actions.ARCHIVE_TASK:
			return taskStateReducer('TASK_ARCHIVED')(state,action);
		
		case actions.PIN_TASK:
			// let task = state.tasks.find(task => task.id === action.id);
			// if (task.state === 'TASK_INBOX')
			// 	return taskStateReducer('TASK_PINNED')(state,action);
			// else
			// 	return taskStateReducer('TASK_INBOX')(state,action);

			return togglePinReducer(state,action);

		default:
			return state;
	}
}

const defaultTasks = [
	{id:"1", title:"something", state:"TASK_INBOX"},
	{id:"2", title:"something more", state:"TASK_INBOX"},
	{id:"3", title:"something else", state:"TASK_INBOX"},
	{id:"4", title:"something again", state:"TASK_INBOX"},
];

export default createStore(reducer, {tasks: defaultTasks});
