import React from 'react'

const Row = ({destination, time}) => {
  return (
    <tr>
      <td>
        <a>
          {"To: " + destination}
        </a>
        <br/>
      </td>
      <td>
        <small>
          {"departs at " + new Date(time* 1000).toLocaleTimeString()}
        </small>
      </td>
    </tr>
  )
}

export default Row
