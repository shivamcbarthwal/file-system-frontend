import React, { useState, useEffect } from "react";
import { Header, Icon, Menu } from 'semantic-ui-react';
import axios from 'axios';
import AppMenu from "./app-menu";
import FileUpload from "./file-upload";

//functional component to show the explorer window
const WindowsExplorer = () => {

    // useState function returns an array of 2 elements that we assign to variables using destructuring syntax
    //first variable is a newly state variable and second corrosponds to the function to update the state variable
    //'content' is a state to hold the directories and file in the root, 'setContents' updates the state of content
    const [contents, setContents] = useState([])

    // state to configure current path, and a function updates the path
    const [currentDirectory, setCurrentDirectory] = useState([""])

    // state to hold the file input on upload
    const [selectedFile, setSelectedFile] = useState([])

    // state to hold the user input to search the content in search bar in the current directory
    const [searchContent, setSearchContent] = useState([""])

    //state to hold the directories and files that are currently shown or filtered, and function to change/update the content
    const [shownContents, setShownContents] = useState([])

    // called on every render equivalent to 'ComponentDidMount'
    useEffect(()=>{
        getRoot()

    }, [])

    const getRoot = () => {
        // API call to the end point 'browse' to get contents in the root directory
        fetch("http://127.0.0.1:5000/browse/", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then( resp => resp.json())
            .then( resp => {

                //update state to the response returned by request
                setContents(resp)
                setShownContents(resp)
                setCurrentDirectory("")
            })
            .catch( error => console.log(error))
    }

    // handler triggered when the contnet in the current path clicked is of type directory
    const showContent = (directory) => evt => {

        // add string to the end point: current directory in addition to the path user clicks
        fetch("http://127.0.0.1:5000/browse/" + currentDirectory + directory.name, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then( resp => resp.json())
            .then( resp => {

                //Update states
                setContents(resp)
                setShownContents(resp)
                setCurrentDirectory(currentDirectory +  directory.name + '/')

            })
            .catch( error => console.log(error))
    }

    // handler function to filter the search input and loop through the 'contents' and check if contents contain the search content
    // to avoid case sensitivity, the input gets converted to lowercase

    const filterContent = () => {
        setShownContents(contents.filter(content => content.name.toLowerCase().includes(searchContent.toLowerCase())))
    }

    // download handler triggered if content in the current directory is of type 'file'
    const downloadFile = (file) => evt => {
        axios({
            // add string current directory and file clicked on to do the api call to download end point
            url: 'http://127.0.0.1:5000/download/' + currentDirectory + file.name, //your url
            method: 'GET',
            responseType: 'blob', // binary data
        }).then((response) => {
            console.log(response);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.name); //or any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }

    // upload handler triggered when upload button is clicked
    const uploadFile = async () => {

        // Create the object of form data
        const data = new FormData();

        //Update the form data object
        data.append(
            "file",
            selectedFile,
            selectedFile.name
        )

        // Request to the upload end point at api in backend
        // send the form data object

        await axios.post('http://127.0.0.1:5000/upload/' + currentDirectory, data)
            .then((response) => {
                // update 'contents' state array with the new file data
                setShownContents(shownContents => (shownContents.concat({name: selectedFile.name, type: "file"})))
            });
        alert("File uploaded succesfully");
    }

    return(

        <div className="ui centered grid" style={{paddingTop: '10px'}}>
            <div className="ui twelve wide column">
                <div className="ui fluid raised card" style={{height: '600px', padding: '20px'}}>
                    <AppMenu
                        onChange={event => setSearchContent(event.target.value)}
                        onSearch={filterContent}
                        onHome = {getRoot}
                    />
                    <div className="ui cards">

                        {/*Loop through state array containing files and directories*/}

                        {shownContents.map(content=> {
                            return(
                                <div className="ui link card" key={content.name} onClick={content.type === "directory" ? showContent(content) : downloadFile(content)}>
                                    <div className="image">
                                        {
                                            content.type === "directory" ?  <Icon name='folder' size='big' color='yellow' />
                                                : <Icon name='file' size='big' color='grey' />
                                        }
                                    </div>
                                    <div className="content">
                                        <div className="header">{content.name}</div>
                                    </div>
                                </div>
                            )})}
                    </div>
                </div>
            </div>

            {/*Render FileUpload as a child component
             props passed to child, 'onChange' stores the file picked to the 'selectedFile' state array
             and onClick triggers the upload to the end point at api*/}

            <FileUpload
                onChange={event => setSelectedFile(event.target.files[0])}
                onClick={uploadFile}
            />
        </div>

    )
}

export default WindowsExplorer;

