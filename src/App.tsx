/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

import {getTodos, getUsers} from './api'

export const App: React.FC = () => {
  const [todosAll, setTodosAll] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<'all' | 'active' | 'completed'>('all');

  const [filterList, setFilterList] = useState<Todo[]>([]);



  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodosAll)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (filterType === 'all') {
      setFilterList(todosAll);
    } else if (filterType === 'active') {
      setFilterList(todosAll.filter(todo => !todo.completed));
    } else if (filterType === 'completed') {
      setFilterList(todosAll.filter(todo => todo.completed));
    }
  }, [filterType, todosAll]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filterType={filterType} newFilterValue={(newValue) => setFilterType(newValue) } />
            </div>

            <div className="block">
              {loading && (<Loader />)}
              {!loading && todosAll.length > 0 && (
                <TodoList todos={ filterList } />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
