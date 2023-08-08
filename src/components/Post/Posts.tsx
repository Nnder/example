import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';

// получаем ссылку из переменных окружения
// добавил тернарный оператор тк в ide на stackblitz не работали env
const url : string = process.env.REACT_APP_API_URL ?
    process.env.REACT_APP_API_URL :
    'https://jsonplaceholder.typicode.com';

// создаем интерфейс для постов для определения информации которая будет лежать внутри поста
// информация должна быть именно такого типа и никакая иначе
interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string
}


// получаем данные c api
async function getPosts() : Promise<IPost[]>{
    const response = await fetch(`${url}/posts`)
    return await response.json();
}

const Posts = () => {
    const [posts, setPosts] = useState<IPost[]>([])

    // при загрузке страницы получаем post
    useEffect(()=> {
        try {
            getPosts().then((data)=>{
                setPosts(data);
            })
        } catch (e) {
            console.error(e);
        }
    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {posts.length ? (
                posts.map((post: IPost) =>(
                    // key должен быть уникальным, чтобы избежать лишних render
                    <Card key={post.id} style={{ maxWidth: '46rem', margin: '5px' }}>
                        <Card.Header as="h5">Post №{post.id} from user {post.userId}</Card.Header>
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>
                                {post.body}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )))
                : (<div>Posts not found</div>)
            }

        </div>
    );
};

export default Posts;