import React from 'react';

export const Loading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100000,
      }}
    >
      <div
        class="spinner-border m-5"
        role="status"
        style={{
          width: '70px',
          height: '70px',
        }}
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};
