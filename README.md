This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Front-end Windows Explorer App

The objective of this app is to allow user to browse the local file system like MAC OS based 'Finder' windows explorer application.

### Key Functionalities of the App 
- A user can view the contents of root in Icon view
- Drill down to directories and sub-directories
- User can see the current path in the header of the app
- Upload the file to the current path, current path updates on drilling down to directories, or sub directories
- A user can trigger download to the file on click
- A user can search the files, or directories/sub directories in the current path by entering keywords in the search bar. This feature must be efficient when there is a heavy volume of data and massive content in the directories
- User can return to the root view by clicking on Home button

###  Framework and Technologies Used
- This app is developed in JavaScript as a key language. React JS, a Javascript library alllowing to use JSX to write templat. For the design and styling, the app uses a popular front-end styling framework: "Semantic UI"

### Prequisite to launch the app
- Run 'npm install' to download all the dependencies in package.json file (node modules folder is not present in the repo, so npm install will build the dependencies in the node module)
- To start the app, run 'npm start' that will launch the app in development server
- Browse the web app in [http://localhost:3000/]

### Brief Insight into Front-end Architecture
- The app has one main component named as "windows-explorer" that encapsulates other two components => "file-upload", and "app-menu" as child components of windows-explorer.
- Parent component is implemented as a functional based components based on hooks that enables to use states in components.
- To get the content, comprising of directories, sub-directories, files in te root folder, we unleash the potential of react hooks -useState that provides destructurizing of array to use state, and a function to update the state on render. UseEffect is other hook, that serves as an alternate to "comonentDidMount". As we want to have root view upon rendering of the main component, we do the api call inside the "getRoot" method which is called inside "useEffect"
- To drill down to the directories, we trigger "onClick" event that triggers either "showContent" method, or "downloadFile" method. We achieve this by looping the array returned as response of doing api get call to browse the root. If the type of the content is directory, then showContent is triggered, and if it is a file, downloadFile is triggered.
- To handle upload, and render Menu in the main component, we achieve this by passing in the props from window-explorer component to these child components.
- Upload component receive props => "onChange", and "onClick" with former recording the file input picked by user, and the latter triggers the upload in the upload handler method in the parent component. In the downloadFile method, the form data is posted to the end point to handle uploads, and to show the content in the current directory, the data which is an object is pushed to an array => ShownContents by calling setShownContents function and passing it the new object
- The key functionality in the "AppMenu" component is to enable search by keyword functionality that updates the state "shownContents" which is basically the filtered array from "Contents". the props received "onSearch" triggers the filterContent method that loops through using filter in "Contents" state array which is our root, and checks if search content or keyword is contained in the contents, and accordingly setShownState updates. To enable to navigation to home page, the AppMenu recieves a prop "onHome", that triggers the getRoot method in arent component which is called inside "useffect" that renders the root component again. Further to view the current path in the header we pass the state => "currentDirectory" as the props to the AppMenu component  

