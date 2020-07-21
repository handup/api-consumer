import React from 'react'

const Page = ({ pageNumber, isCurrent, onChange }) => {

  const renderedPageNumber = () => pageNumber + 1

  const click = (event) => {
    event.preventDefault()
    onChange(pageNumber)
  }

    return(
      <li className="page-item mr-1">
        <button className={(isCurrent ? " button-outline" : "")} onClick={click} >
          {renderedPageNumber()}
          </button>
      </li>
    )
}

export default Page
