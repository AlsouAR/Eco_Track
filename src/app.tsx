import React from 'react';
import HomePage from "./pages/home";

import {useRoute} from "./components/routing";

const App = () => {
    const url = useRoute()

    console.log(url)

    if (url === '/'){
        return <HomePage />
    }
    
    return <h1>404 not found</h1>
}

export default App;