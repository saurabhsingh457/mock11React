import React, { useState } from 'react';

const PostNotice = () => {
  const [name, setname] = useState('');
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://scary-lemming.cyclic.app`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          title,
          description,
        }),
      });

      const data = await response.json();
      console.log('Notice posted:', data);

      // Clear form fields after successful submission
      setname('');
      settitle('');
      setdescription('');
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div>
      <h2>Post Notice</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Author Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </label>
        <br />
        <label>
          Notice Title:
          <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Notice Description:
          <textarea
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Post Notice</button>
      </form>
    </div>
  );
};

export default PostNotice;