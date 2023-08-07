import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';

// получаем значение из переменных окружения
const url : string | undefined = process.env.REACT_APP_API_URL;

// создаем интерфейс для постов для определения информации которая будет лежать внутри поста
// информация должна быть именно такого типа и никакая иначе
interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string
}


// получаем данные
async function getPosts(){
    const response = await fetch(`${url}/posts`)
    return response.json();
}

const Posts = () => {

    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(()=> {
        getPosts().then((data: IPost[])=>{
            setPosts(data);
        })
        console.log(process.env.REACT_APP_API_URL);
    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {posts.map((post: IPost) =>(
                <Card key={post.id} style={{ maxWidth: '46rem', margin: '5px' }}>
                    <Card.Header as="h5">Post №{post.id} from user {post.userId}</Card.Header>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>
                            {post.body}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Posts;