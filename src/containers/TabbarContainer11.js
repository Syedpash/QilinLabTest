import React from 'react'
import DefaultTab from '../components/tabbar/DefaultTab'
import {connect} from 'react-redux';
import Tabbar from '../components/tabbar/Tabbar';
import '../components/tabbar/tabbar.css';
import Add from '../components/tabbar/Add';
import { addNewTab, deleteATab } from '../Actions/ActionTypes';
 const TabbarContainer = (props) => {
     let {tabs, addNewTab, deleteATab}= props;
     
    console.log(tabs)
    const handleTab = () => {

    }
    const addNewTabFunc = (e) => {
        if(tabs.length < 10 ) {
            addNewTab();
        }
    }
    const deleteATabFunc = (e, tabId) => {
        console.log(tabId);
        deleteATab(tabId);
    }
    return (
        <>
        <div className="tabbar-container">

        <button className="previous-button"  onClick={(e) => handleTab(e, 'Left')}>&#8249;</button>
           <DefaultTab />
           {
               tabs.map((tab) => <Tabbar tab={tab} deleteATab={deleteATabFunc}/>)
           }            
        <button className="next-button"  onClick={(e) => handleTab(e, 'Right')}>&#8250;</button>  
        </div>
        <Add addNewTab={addNewTabFunc}/>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        tabs: state.tabs
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addNewTab: () => dispatch(addNewTab())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabbarContainer);