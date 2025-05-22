/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

import {getTodos, getUsers} from './api'

export const App: React.FC = () => {
  const [todosAll, setTodosAll] = useState<Todo[]>([]);
  const [loader, setLoader] = useState<boolean>([]);

  useEffect(() => {
    getTodos().then((response) => {
      // console.log(response);

      setTodosAll(response);
    })
    //// При есинк Евейт тут нужно вызывать саму функцию а при зен - нет?
  }, [])

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              <Loader />
              <TodoList todos={ todosAll } />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
