import React from "react";
import {Icon} from "semantic-ui-react";

//Receive props from Parent component
const FileUpload = (props) => {

    return(
        <div className=" six column centered row">
            <div className="column">
                <div className="ui input">
                    <input type="file" onChange={props.onChange}/>
                </div>
            </div>
            <div className="column">
                <div className="ui button" onClick={props.onClick}>
                    <div className="hidden content">Upload</div>
                    <div className="visible content">
                        <Icon name='upload' size='small' />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default FileUpload;