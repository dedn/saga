import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Blog() {
    const dispatch = useDispatch()
    //
    // useEffect(()=>{
    //     dispatch({type:'LOAD_BLOG_DATA'})
    // },[])

    const blogData = useSelector(s=> s.app.blog)


    console.log('blogData', blogData)

    return (
        <>
        <div>Blog</div>
            <button
             onClick={()=>{
                 dispatch({
                     type: 'LOAD_SOME_DATA'
                 })
             }}
            >load some data</button>
            </>


    )
}
