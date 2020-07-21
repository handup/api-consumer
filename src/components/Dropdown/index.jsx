import React, { useState } from 'react';

const Dropdown = ({elements, defaultValue, onChange}) =>{

  return (
    <select name="select" value={defaultValue} onChange={onChange}>
    {elements.map((n) => { 
      return (<option value={n.key}>{n.name}</option>);
    })}
  </select>
  )
}

export default Dropdown;