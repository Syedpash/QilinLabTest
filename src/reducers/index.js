import * as types from '../Actions/Constants.js';
import produce from 'immer';
let i = 4;
const initialState = {
    tabs:["Tab2", "Tab3"],
    visibleTabs:[]
}
const Reducer = (state=initialState, action) => {
    return produce(state, draftState => {
    switch(action.type) {

        case types.ADD_NEW_TAB:
            let tabName = action.name + i;
            console.log(tabName);
            //draftState.tabs.push();
            return;
        
        default:
            return state;
    }
})
}
export default Reducer;