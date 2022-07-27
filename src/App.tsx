import React from "react";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
    event.currentTarget.reset();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="name" onChange={onChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
