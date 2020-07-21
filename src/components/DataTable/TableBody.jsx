import React from 'react'
import Row from './Row'


const rowsInPageNumber = (pageNumber, rowsPerPage) => {
    const startIndex = pageNumber * rowsPerPage
    return [startIndex, startIndex + rowsPerPage]
  }

const TableBody = ({ rows, currentPageNumber, rowsPerPage}) => {

    const rowsToRender = rows
      .map(row => <Row key={row.id} destination={row.destination} time={row.time} />)
      .slice(...rowsInPageNumber(currentPageNumber, rowsPerPage))

  return (
    <table>
          <tbody>
            { rowsToRender }
          </tbody>
    </table>
  )
}

export default TableBody
