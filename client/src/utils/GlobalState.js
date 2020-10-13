import React, { createContext, useContext} from 'react'
import {useProductReducer} from './reducers'

const StoreContext = createContext()

const { Provider } = StoreContext

function StoreProvider({value=[], ...props}) {
    const [state, dispatch] = useProductReducer({
        products: [],
        categories: [],
        currentCategory: '',
        cart: [],
        cartOpen: false
    })
    console.log(state)
    return <Provider value={[state, dispatch]} {...props} />
}

const useStoreContext = () => useContext(StoreContext)

export { StoreProvider, useStoreContext }