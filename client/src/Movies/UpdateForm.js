import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios';

function UpdateForm({ handleEditCount }){
    const [ newValue, setNewValue ] = useState(null)
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const id = match.params.id;
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            res.data = {
                ...res.data,
                stars: res.data.stars.toString()
            }
            setNewValue(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, [match.params.id]);

     const goBack = () => {
         const id = match.params.id;
         history.push(`/movies/${id}`);
     }

    const changeHandler = e => {
        setNewValue({
            ...newValue,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
     
        newValue.metascore = newValue.metascore * 1;
        newValue.stars = newValue.stars.split(',');

        const id = match.params.id; 
        axios
        .put(`http://localhost:5000/api/movies/${id}`, newValue)
        .then(() => {
            handleEditCount();
            history.push(`/movies/${id}`);
           
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <div className='form-wrapper'>
            
            {newValue && (
                <form onSubmit={handleSubmit}>

                    <label>Title</label>
                  
                        <input
                            name='title'
                            value={newValue.title}
                            onChange={changeHandler}
                        />
               

                    <label>Director</label>
                  
                        <input
                            name='director'
                            value={newValue.director}
                            onChange={changeHandler}
                        />
              

                    <label>Metascore</label>
                   
                        <input
                            name='metascore'
                            value={newValue.metascore}
                            onChange={changeHandler}
                        />
                  

                    <label>Stars</label>
                  
                        <input
                            name='stars'
                            value={newValue.stars}
                            onChange={changeHandler}
                        />
                  

                    <input  type='submit' value='Submit Changes' className='form-submit'/>
                </form>
            )}
<button className='back-button' onClick={goBack}>Apply changes</button>

        </div>
    );
}

export default UpdateForm;