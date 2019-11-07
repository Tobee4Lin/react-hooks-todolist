export const countReducer = (state, action) => {
  switch (action.type) {
    case "increment": {
      return {
        count: state.count + 1
      }
    }

    case "decrement": {
      return {
        count: state.count - 1
      }
    }

    default: {
      return state
    }
  }
}

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "changeTodoItem": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.currentAuthor = 'Tom'
      newState.currentInfo = action.payload
      return newState
    }

    case "addTodoItem": {
      let newState = JSON.parse(JSON.stringify(state));
      if(state.currentInfo) {
        newState.list.push({ desc: state.currentInfo, author: state.currentAuthor, isDone: false });
      }
      return newState
    }

    case "deleteTodoItem": {
      const { index } = action
      let newState = JSON.parse(JSON.stringify(state));
      newState.list.splice(index, 1)
      return newState
    }

    case "editTodoItem": {
      const { index } = action
      let newState = JSON.parse(JSON.stringify(state));
      newState.list[index].desc = state.currentInfo
      return newState
    }

    default: {
      return state
    }
  }
}