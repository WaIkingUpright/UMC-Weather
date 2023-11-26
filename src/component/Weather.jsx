import React, { useState } from 'react'
import axios from 'axios'

export default function Weather() {
    const [loc, setLoc] = useState("");
    const [result, setresult] = useState({});
    const API_KEY = '5d09b0119bfc616b84f023bbd027177c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${API_KEY}`;

    const searchWether = async (e) =>{
        if(e.key === 'Enter'){
            try {
                const data = await axios({
                    method: 'get',
                    url: url
                });
                setresult(data);
            } catch (error) {
                alert(error);
            }
        }
    }
    return (
        <div className='container-Weather'>
            <div className='container-Input'>
                <input className='input-Weather' type="text" placeholder='도시를 입력하세요.'
                value={loc} onChange={e=>setLoc(e.target.value)} onKeyDown={searchWether}/>
            </div>

            {Object.keys(result).length !== 0 &&
                <div className='container-Result'>
                    <p className='context-City'>{result.data.name}</p>
                    <p className='context-Temperature'>{Math.round(((result.data.main.temp - 273.15) * 10)) / 10}°C</p>
                    <p className='context-Sky'>{result.data.weather[0].main}</p>
                </div>
            } 
        </div>
    )
}
