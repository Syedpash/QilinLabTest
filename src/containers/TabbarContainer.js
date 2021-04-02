import React, {useEffect, useRef, useState} from 'react'
import DefaultTab from '../components/tabbar/DefaultTab'
import Tabbar from '../components/tabbar/Tabbar';
import '../components/tabbar/tabbar.css';
import Add from '../components/tabbar/Add';
let i = 4;
let currentX = 0;
 const TabbarContainer = () => {
     const [tabs, settabs] = useState(["Tab2", "Tab3"]);
     const [visibletabs, setVisibletabs] = useState(["Tab1","Tab2", "Tab3"])
     const tabref = useRef();
const [leftShow, setLeftShow] = useState(true)
const [rightShow, setRightShow] = useState(true)

    //console.log(tabs)
    const handleTab = (e, direction) => {
        if(direction == 'Right') {
            console.log(tabref.current)
            tabref.current.scrollLeft +=203;
            let _visibleTabs = [...visibletabs];
            let index = tabs.indexOf(_visibleTabs[2])
            let value = tabs[index + 1]
                _visibleTabs.shift()
                _visibleTabs.push(value)
                setVisibletabs(_visibleTabs)
                setLeftShow(false)
            
        } else{          
            tabref.current.scrollLeft -=203;
            let _visibleTabs = [...visibletabs];
            let index = tabs.indexOf(_visibleTabs[0])
            let value = tabs[index - 1]
            if(tabs[index]){
                _visibleTabs.unshift(value)
                _visibleTabs.pop()
                setVisibletabs(_visibleTabs)
            }
                setRightShow(false)
                if(visibletabs[0] == "Tab2" || visibletabs[0] == undefined) {
                    setLeftShow(true)
                }
            
        }
    }
    const addNewTabFunc = (e) => {
        if(tabs.length < 9 ) {
            settabs([...tabs, "Tab"+i]);
            i++;
        }
        setRightShow(false)
        
    }
    const deleteATabFunc = (e, key) => {
        console.log(key);
        let temp = [...tabs]
        temp.splice(key, 1)
        settabs(temp);
    }
    const dragStart=(e) => {
        currentX=e.clientX
    };
    const dragTab = (e, key) => {
        if(e.clientX < currentX) {
            //left
            let _temp = tabs[key - 1]
            let _tabs = [...tabs]
            _tabs[key - 1] = tabs[key]
            _tabs[key] = _temp
            settabs(_tabs)
        }else if(e.clientX > currentX) {
            //right
            let _temp = tabs[key + 1]
            let _tabs = [...tabs]
            _tabs[key + 1] = tabs[key]
            _tabs[key] = _temp
            settabs(_tabs)
        }
    }

    useEffect(() => {
        console.log(visibletabs, tabs)
        if(visibletabs[0] === "Tab1"){
            // left arrow hide
            setLeftShow(true)
            if(tabs.length === 2){
                setRightShow(true)
            }
            
            
        }else if(visibletabs[2] === tabs[tabs.length - 2]){
            // right arrow hidesetLeftShow(false)
            setRightShow(true)
            setLeftShow(false)
        }
        return () => {
            //
        }
    }, [visibletabs])

    return (
        <>
        <div className="tabbar-container">

        <button className="previous-button" disabled={leftShow}  onClick={(e) => handleTab(e, 'Left')}>&#8249;</button>
        <div className="tab-container" ref={tabref}>

        <DefaultTab />
           {
               tabs.map((tab, i) => <Tabbar key={i} id={i} tab={tab} deleteATab={deleteATabFunc} dragTab={dragTab} dragStart={dragStart}/>)
           } 
        </div>         
        <button className="next-button" disabled={rightShow}   onClick={(e) => handleTab(e, 'Right')}>&#8250;</button>  
        </div>
        <Add addNewTab={addNewTabFunc}/>
        </>
    )
}
export default TabbarContainer;