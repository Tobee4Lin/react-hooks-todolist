import React, { useState, useEffect, useReducer } from 'react';

import { Button, Input, List, Icon, Avatar, Spin, notification } from 'antd'

import { initCountState, initTodoState } from '../../store/index'
import { countReducer, todoReducer } from '../../store/reducer'

import './index.css'

const TodoApp = () => {
  const [countState, countDispatch] = useReducer(countReducer, initCountState);
  const [todoState, todoDispatch] = useReducer(todoReducer, initTodoState);

  const [isLoading, setIsLoading] = useState(false);

  const openNotification = () => {
    notification.open({
      message: 'Notification about count',
      description: `The current count is ${countState.count}`,
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      duration: 3,
    });
  };

  const addTodoItem = () => {
    setIsLoading(true)
    setTimeout(() => {
      todoDispatch({ type: "addTodoItem" })
      setIsLoading(false)
    }, 1000);
  }

  const deleteTodoItem = (index) => {
    todoDispatch({ type: "deleteTodoItem", index })
  }

  const editTodoItem = (index) => {

  }


  /**
   * 页面开始加载时会执行，同时依赖项变化时也会执行
   */
  useEffect(() => {
    openNotification()
  }, [countState.count])

  return (
    <Spin spinning={isLoading}>
      <div>This is Count: <h2>{countState.count}</h2></div>
      <Button type="default" shape="circle" onClick={() => countDispatch({ type: "decrement" })} style={{ marginRight: '20px' }}> - </Button>
      <Button type="primary" shape="circle" onClick={() => countDispatch({ type: "increment" })}> + </Button>
      <hr />
      <div>This is a Todo App.</div>
      <div className="todo-wrap">
        <div className="inline_block_div" style={{width: '80%', marginRight: '20px'}}>
          <Input placeholder="input todo item" onChange={(e) => todoDispatch({ type: "changeTodoItem", payload: e.target.value })} />
        </div>
        <div className="inline_block_div">
          <Button type="primary" onClick={addTodoItem}> add </Button>
        </div>
        <div style={{textAlign: 'left'}}>
          <List
            itemLayout="horizontal"
            dataSource={todoState.list}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="#">{item.author}</a>}
                  description={item.desc}
                />
                <Button type="default" size="small" onClick={() => editTodoItem(index)} style={{marginRight: '10px'}}><Icon type="edit"></Icon></Button>
                <Button type="danger" size="small" onClick={() => deleteTodoItem(index)}><Icon type="delete"></Icon></Button>
              </List.Item>
            )}
          />
        </div>
      </div>
    </Spin>
  )
}

export default TodoApp;