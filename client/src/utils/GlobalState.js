import React from 'react'
import store from './store'
import Provider from 'react-redux'
const StoreContext = createContext()

const { Provider } = StoreContext

export default function StoreProvider({...props}) {
    
    return <Provider store={store} {...props} />
}

