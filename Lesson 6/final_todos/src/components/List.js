import React from 'react';

export default function List(props) {
  const toggleItem = item => {
    if (!props.toggleItem && !(typeof props.toggleItem === 'function')) return;

    props.toggleItem(item);
  };

  return (
    <ul>
      {props.items.map(item => {
        return (
          <li key={item.id}>
            <span
              onClick={() => toggleItem(item)}
              style={{ textDecoration: item.complete ? 'line-through' : 'none'}}>
              {item.name}
            </span>
            <button onClick={e => props.removeItem(item)}>X</button>
          </li>
        );
      })}
    </ul>
  );
};
