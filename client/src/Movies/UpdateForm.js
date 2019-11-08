// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = props => {
    
    const [movie, setMovie] = useState(null);
        
    
    const fetchMovie = id => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => setMovie(res.data ))
          .catch(err => console.log(err.response));
      };

    useEffect(() => {
        fetchMovie(props.match.params.id)
    }, [props.match.params.id])
    
    const handleChange = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    const handleStar = index => event => {
        setMovie(
            {
                ...movie,
                stars: movie.stars.map((star, starIndex) => {
                    return starIndex === index ? event.target.value : star;
                })
            })
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
            .then(res => {
                console.log(res)
                props.history.push('/')
            })
            .catch(error => console.log(error.response))
    }

    const addStar = event => {
        event.preventDefault();
        setMovie({...movie, stars: [...movie.stars, '']})
    }

    
    if(!movie){
        return <div>Loading...</div>
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input type='text' 
                   name='title'
                   value={movie.title}
                   placeholder='Title'
                   onChange={handleChange} 

            />
            <input type='text' 
                   name='director'
                   value={movie.director}
                   placeholder='Director'
                   onChange={handleChange} 

            />
            <input type='text' 
                   name='metascore'
                   value={movie.metascore}
                   placeholder='Metascore'
                   onChange={handleChange} 

            />
            {movie.stars.map((starName, index) => {
                return (
                
                        <input key={index}
                               type='text' 
                               value={starName}
                               placeholder='Star'
                               onChange={handleStar(index)}
                        />
                    
                )
            })}
            <button type='submit'>Update</button>
            <button onClick={addStar}>Add Actor</button>
        </form>
    )
}


export default UpdateForm;