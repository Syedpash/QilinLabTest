import React from 'react'

export default function Tabbar(props) {
    let {tab, deleteATab, id, dragTab,dragStart} = props;
    return (
        <>
        
        <div className="tabs" draggable onDragEnd={(e) => dragTab(e, id)} onDragStart={(e) => dragStart(e)}>
            <p>{tab}</p>
            <i className='fas fa-times' onClick = {(e) => deleteATab(e, id)}></i>
        </div>
        </>
    )
}
