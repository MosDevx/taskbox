// so we need a store dont we..have to callbacks beign passed into the component onPinTask onArchiveTask() both of which simply change the state
// the state is a property of a task object so our store stores tasks .. we change based on the id of the task

//? initial shape of our state thingy..but this is not true..we are storing a rray of tasks
const task = {
	id:"",
	title:"",
	state:"",
	//*TASK_ARCHIVED TASK_PINNED TASK_INBOX
};

const initialState = {
	tasks: {
		"1":{id:1,title:"first task", state:""},
	},
	loading : "false"
}

//make actions,make action creators, make reducers , make store

//? Action Consts
const PIN_TASK = "PIN_TASK";
const ARCHIVE_TASK = "ARCHIVE_TASK";


//? Action Creators
const pinTask = (taskId) => (
	{
		type: PIN_TASK,
		payload: taskId
	}
);

const archiveTask = (taskId) => (
	{
		type: ARCHIVE_TASK,
		payload: taskId
	}
);

//? The Reducers
// we can filter out all the tasks that dont match id .. we wont modify we'll create a new tasks object...decomposs the filter result then add a new task
//* using compostion cause loading state doesnt realy touch the taklists

//this has a problem.. i am not returning the previous state at all ie ...state  .. but its  onlu dealing with a slice of state so yeah..
const tasksReducer = (state=[], action) => {
	switch (action.type){
		case PIN_TASK:
			return(
			
					state.tasks.map((task)=>{
						if (task.id === action.payload){
							return Object.assign({},task, {state:"TASK_PINNED"});
						}
						return task
					})
			)
				
			
		case ARCHIVE_TASK:
			return(
			
				state.tasks.map((task)=>{
					if (task.id === action.payload){
						return Object.assign({},task, {state:"TASK_ARCHIVED"});
					}
					return task
				})
		)
		default
	}	
	
}
