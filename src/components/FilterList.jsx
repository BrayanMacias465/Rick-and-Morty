import React from 'react'

const FilterList = ({suggestedList, setSearchInput}) => {

    const handleClick = (id) => setSearchInput(id)

  return (
    <ul className="filter-list">
        {
            suggestedList?.map(location =>(
                <li className="filter-item" onClick={() => handleClick(location.id)} 
                key={location.id}>{location.id} {location.name}
                </li>
            ))
        }
    </ul>
  )
}

export default FilterList