import React from "react";
import {Icon} from "semantic-ui-react";


// receive props passed from parent component
const AppMenu = (props) => {
    return(
        <div className="ui menu" >
            <div className="ui button" onClick={props.onHome} >
                <Icon name='home'  size='large' color='black'  />
            </div>

            <div className="right item">
                <div className="ui icon input">
                    <input type="text" placeholder="Search..." onChange={props.onChange}/>
                    <div className="ui button" onClick={props.onSearch}>Go</div>
                </div>
            </div>
        </div>

    )
}
export default AppMenu