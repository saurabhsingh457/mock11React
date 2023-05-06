import React from 'react';
import PostNotice from './comp/post';
import ViewNotice from './comp/view';

const App = () => {
  return (
    <div>
      <h1 >Notice Board App</h1>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
      <PostNotice />
      <ViewNotice />
      </div>
    </div>
  );
};

export default App;