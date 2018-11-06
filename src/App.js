import React, { useState, useEffect } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

function isSearched(searchTerm) {
  return function(item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
}

export default function App() {
  const [result, setResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);

  // function setSearchTopStories(result) {
  //   setResult(result);
  // }

  useEffect(() => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => setResult(result)) // i think function setSearchTopStories(result) is not necessary
      .catch(error => error);
  }, []);

  function onDismiss(id) {
    const updatedHits = result.hits.filter(item => item.objectID !== id);
    setResult(...result, updatedHits);
    // setResult((result: { ...result, hits: updatedHits }));
  }

  function onSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  if (!result) {
    return null;
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
      <div key={item.objectID} className="table-row">
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
