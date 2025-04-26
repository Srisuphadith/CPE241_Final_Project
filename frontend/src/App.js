import { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setMessage(data.message))
            .catch(error => {
                console.error('Fetch error: ', error);
            });
    }, []);

    return <h1 > { message || "Loading..." } < /h1>;
}
export default App;