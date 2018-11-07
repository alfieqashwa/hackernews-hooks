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
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [list, setList] = useState(data);

  function onSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  function onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = list.filter(isNotId);
    setList(updatedList);
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

const Search = ({ value, onChange, children }) => (
  <form>
    {children}
    <input type="text" value={value} onChange={onChange} />
  </form>
);

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list.filter(isSearched(pattern)).map(item => (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
        <span>
          <Button onClick={() => onDismiss(item.objectID)} type="button">
            > Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

const Button = ({ onClick, className = '', children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);
