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
    <div className="page">
      <div className="interactions">
        <Search value={searchTerm} onChange={onSearchChange}>
          Search
        </Search>
      </div>
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
      <div key={item.objectID} className="table-row ">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>{item.author}</span>
        <span style={{ width: '10%' }}>{item.num_comments}</span>
        <span style={{ width: '10%' }}>{item.points}</span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
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
