import React from 'react'
import { Outlet, Link } from "react-router-dom";


function PostBTN() {
  function HomeButton() {
    let history = useHistory();
  
    function handleClick() {
      history.push("/Post");
    }
  }
  return (
    <div>
        <div className='flex bottom-3 fixed right-5 '>
            <Link to={'/Post'} className='bg-indigo-950 w-28 text-gray-400 p-2 rounded-xl'><p className='text-center'>Post?</p></Link>
        </div>
    </div>
  )
}

export default PostBTN