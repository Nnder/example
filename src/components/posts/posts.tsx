import React, {useEffect} from 'react';
const url : string = 'https://jsonplaceholder.typicode.com';

interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string
}

async function getPosts(){
    const response = await fetch(`${url}/todos/1`)
    console.log(response);
}

const Posts = () => {

    useEffect(()=>{
        getPosts()
    }, [])

    return (
        <div>
            
        </div>
    );
};

export default Posts;