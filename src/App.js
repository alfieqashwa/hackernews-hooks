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

export default function App() {
  const [list, setList] = useState(data);

  function onDismiss(id) {
    setList(list.filter(item => item.objectID !== id));
    // setData(updatedList);
  }

  return (
    <div className="App">
      {list.map(item => (
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
}
