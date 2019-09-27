import React, { useState }  from 'react';

const PaginaNaoEncontrada = (props) => {
    const [pagina, setpagina] = useState(1);

    const Background = `https://anilist.co/img/404/404_chan${pagina}.jpg`
    return(
        <div className="center">
            <img onClick={() => {
                if (pagina === 3){
                    setpagina(pagina + 2)
                }else if(pagina < 5){
                    setpagina(pagina + 1)
                } else {
                    props.history.push('/');
                }
            }} style={{width: '100hv', height: '100vh', margin: 30, cursor: 'pointer'}} src={Background}/>
        </div>
    )
}

export default PaginaNaoEncontrada