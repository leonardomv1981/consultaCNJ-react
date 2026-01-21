import React from 'react'

const useFetch = () => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    
    
    async function request(form) {
        console.log(form);

        try {

        } catch (err) {

        } finally {
            setLoading(false);
        }
        // const url = 'https://ranekapi.origamid.dev/json/api/usuario';
        // const options = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(form),
        // }
        
        // const resposta = await fetch(url, options);
        // console.log('submeteu')
        // console.log(resposta);
    }

  return {data, error, loading};
}

export default useFetch
