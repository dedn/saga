import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

function App() {
    const store = useSelector(store => store)
    const dispatch = useDispatch()


    console.log('s', store)

  return (
    <h1>
      Redux-saga tutorial: lesson #3
        <div>
            <Link to={'/blog'}> blog</Link>
        </div>
        <button
        onClick={()=> dispatch({type:'LOAD_DATA'})}>
          click
        </button>
    </h1>
  );
}

export default App;
