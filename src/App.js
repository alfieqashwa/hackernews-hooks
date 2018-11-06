import React, { useState } from 'react';
import './App.css';

const data = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

function isSearched(searchTerm) {
  return function(item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
}

export default function App() {
  const [list, setList] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');

  function onDismiss(id) {
    setList(list.filter(item => item.objectID !== id));
  }

  function onSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="App">
      <Search value={searchTerm} onChange={onSearchChange}>
        Search
      </Search>
      <Table list={list} pattern={searchTerm} onDismiss={onDismiss} />
    </div>
  );
}

const Search = props => {
  const { value, onChange, children } = props;
  return (
    <form>
      {children}
      <input type="text" value={value} onChange={onChange} />
    </form>
  );
};

const Table = props => {
  const { list, pattern, onDismiss } = props;
  return (
    <div>
      {list.filter(isSearched(pattern)).map(item => (
        <div key={item.objectID}>
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
            <button onClick={() => onDismiss(item.objectID)} type="button">
              Dismiss
            </button>
          </span>
        </div>
      ))}
    </div>
  );
};
