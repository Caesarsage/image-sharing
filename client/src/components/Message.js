import React from 'react';

const Message = ({ msg, type }) => {
  return (
    <div className= {type === "error" ? "alert alert-danger alert-dismissible fade show" : 
          'alert-info alert alert-dismissible fade show'
        } role='alert'>
      {msg}
      <button
        type='button'
        className='close'
        data-dismiss='alert'
        aria-label='Close'
      >
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
};


export default Message;