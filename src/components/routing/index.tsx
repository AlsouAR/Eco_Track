import React, {type ReactNode, useContext, useEffect, useState} from 'react'


interface RouteContextValue {
    route?: string;
    changeRoute: (url: string) => void;
}

const RouteContext = React.createContext<RouteContextValue>({ changeRoute: () => null });

interface RoutingProps {
    children: ReactNode
}

const Routing = ({ children }: RoutingProps) => {
    const [url, setUrl] = useState(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => {
            setUrl(window.location.pathname);
        };

        window.addEventListener('popstate', handlePopState);

        return () =>window.removeEventListener('popstate', handlePopState);
    }, []);


    const changeRoute = (url: string) => {
        history.pushState(null, '', url);
        setUrl(url);
    }

    return <RouteContext.Provider value={{ route: url, changeRoute }}>{children}</RouteContext.Provider>
}

export const useRoute = () => useContext(RouteContext).route
export const useChangeRoute = () => useContext(RouteContext).changeRoute


export default Routing
