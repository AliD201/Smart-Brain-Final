import React from 'react';
const Rank = (props) => {
  return (
    <div>
      <div className = 'white f3'>
        {`${props.name} , your Current Entries count...`}
      </div>
        <div className = 'white f1'>
          {`# ${props.entries}`}
        </div>
    </div>
  )
}

export default Rank;
