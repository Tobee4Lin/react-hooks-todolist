import React, { useState, useEffect, useReducer } from 'react';

import { Button, Input, List, Icon, Avatar, Spin, notification, Modal } from 'antd'

import { initCountState, initTodoState } from '../../store/index'
import { countReducer, todoReducer } from '../../store/reducer'

import './index.css'

const TodoApp = () => {
  const [countState, countDispatch] = useReducer(countReducer, initCountState);
  const [todoState, todoDispatch] = useReducer(todoReducer, initTodoState);

  const [isLoading, setIsLoading] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSelected, setCurrentSelected] = useState('all');
  const [todosList, setTodosList] = useState(todoState.list)

  // let todosList = todoState.list

  const openNotification = () => {
    notification.open({
      message: 'Notification about count',
      description: `The current count is ${countState.count}`,
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      duration: 3
    });
  };

  const addTodoItem = () => {
    setIsLoading(true)
    setTimeout(() => {
      todoDispatch({ type: "addTodoItem" })
      setIsLoading(false)
    }, 500);
  }

  const deleteTodoItem = (index) => {
    todoDispatch({ type: "deleteTodoItem", index })
  }

  const editTodoItem = (index) => {
    setCurrentIndex(index)
    setModal2Visible(true);
  }

  const confirmEditTodoItem = () => {
    setIsLoading(true)
    setTimeout(() => {
      todoDispatch({ type: "editTodoItem", index: currentIndex })
      setModal2Visible(false)
      setIsLoading(false)
      setCurrentIndex(0)
    }, 500);
  }

  const cancelEditTodoItem = () => {
    todoDispatch({ type: "changeTodoItem", payload: "" })
    setModal2Visible(false)
  }

  const changeCheckStatus = (index) => {
    todosList[index].isDone = !todosList[index].isDone
    let _todolist = JSON.parse(JSON.stringify(todosList))
    todoDispatch({ type: "changeTodoItemStatus", payload: _todolist })
  }

  const changeStatus = (index) => {
    todosList[index].isDone = !todosList[index].isDone
    let _todolist = JSON.parse(JSON.stringify(todosList))
    todoDispatch({ type: "changeTodoItemStatus", payload: _todolist })
    // // console.log(todosList[index].isDone)
    // if(todosList[index].isDone) {
    //   let _theLastItem = _todolist.splice(index, 1)[0]
    //   console.log(_theLastItem, '_th')
    //   _todolist.push(_theLastItem);
    // } else {

    // }
    // todoDispatch({ type: "changeTodoItemStatus", payload: _todolist })
    // console.log(todosList, '_th')
    notification.open({
      message: 'change Todo item status success',
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      duration: 3
    });
  }

  const keepAll = () => {
    setTodosList(todoState.list)
    setCurrentSelected('all')
  }

  const keepActive = () => {
    let _t = todoState.list.filter(item => {
      return item.isDone == false
    })
    setTodosList(_t)
    setCurrentSelected('active')
  }

  const keepCompleted = () => {
    let _t = todoState.list.filter(item => {
      return item.isDone == true
    })
    setTodosList(_t)
    setCurrentSelected('completed')
  }

  /**
   * 页面开始加载时会执行，同时依赖项变化时也会执行
   */
  useEffect(() => {
    openNotification()
  }, [countState.count])

  useEffect(() => {
    setTodosList(todoState.list)
  }, [todoState.list])

  return (
    <Spin spinning={isLoading}>
      <div>This is Count: <h2>{countState.count}</h2></div>
      <Button type="default" shape="circle" onClick={() => countDispatch({ type: "decrement" })} style={{ marginRight: '20px' }}> - </Button>
      <Button type="primary" shape="circle" onClick={() => countDispatch({ type: "increment" })}> + </Button>
      <hr />
      <div>This is a Todo App.</div>
      <div className="todo-wrap">
        <div className="inline_block_div" style={{ width: '80%', marginRight: '20px' }}>
          <Input placeholder="input todo item" onChange={(e) => todoDispatch({ type: "changeTodoItem", payload: e.target.value })} />
        </div>
        <div className="inline_block_div">
          <Button type="primary" onClick={addTodoItem}> add </Button>
        </div>
        <div style={{ textAlign: 'left' }}>
          <List
            itemLayout="horizontal"
            dataSource={todosList}
            renderItem={(item, index) => (
              <List.Item>
                <span className={["icon-span", item.isDone ? "icon-span-checked" : "icon-span-unchecked"].join(" ")}
                  onMouseEnter={() => changeCheckStatus(index)}
                  onMouseLeave={() => changeCheckStatus(index)}
                  onClick={() => changeStatus(index)}
                >
                  <Icon type={item.isDone ? "check-circle" : "close-circle"} />
                </span>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://github.com/Tobee4Lin/react-hooks-todolist">{item.author}</a>}
                  description={item.desc}
                />
                <Button type="default" size="small" onClick={() => editTodoItem(index)} style={{ marginRight: '10px' }}><Icon type="edit"></Icon></Button>
                <Button type="danger" size="small" onClick={() => deleteTodoItem(index)}><Icon type="delete"></Icon></Button>
              </List.Item>
            )}
          />
        </div>
        <div className="tags-wrapper">
          <div className={['default-tag', currentSelected == 'all' ? 'tag-selected' : ''].join(" ")} onClick={keepAll}> All </div>
          <div className={['default-tag', currentSelected == 'active' ? 'tag-selected' : ''].join(" ")} onClick={keepActive}> Active </div>
          <div className={['default-tag', currentSelected == 'completed' ? 'tag-selected' : ''].join(" ")} onClick={keepCompleted}> Completed </div>
        </div>
      </div>

      <Modal
        title="edit todo item"
        centered
        visible={modal2Visible}
        onOk={confirmEditTodoItem}
        onCancel={cancelEditTodoItem}
      >
        <Input placeholder={todosList[currentIndex].desc} onChange={(e) => todoDispatch({ type: "changeTodoItem", payload: e.target.value })} />
      </Modal>
    </Spin>
  )
}

export default TodoApp;