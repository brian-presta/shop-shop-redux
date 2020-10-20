import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(reducer) 
const StoreProvider = ({...props}) => <Provider store={store} {...props} />

export default  StoreProvider 


