import React, {useState} from 'react'
import Pagination from '../Pagination'
import TableBody from './TableBody'

const calculateTotalNumberOfPages = (rows, rowsPerPage) => {
  if (rowsPerPage === 0) return 0
  return Math.ceil(rows.length / rowsPerPage)
}

const DataTable = ({totalRows = [], rowsPerPage = 40}) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(0)
  const totalNumberOfPages = calculateTotalNumberOfPages(totalRows, rowsPerPage)
  console.log(totalRows)

    return(
      <div>
        <h3>Departures</h3>
        
      <TableBody
        rows={totalRows} 
        currentPageNumber={currentPageNumber} 
        rowsPerPage={rowsPerPage}
      />
      <Pagination
        currentPageNumber={currentPageNumber}
        totalNumberOfPages={totalNumberOfPages}
        onChange={setCurrentPageNumber} />
    </div>
  )
}

export default DataTable