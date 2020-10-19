import React from 'react'
import Provider from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'


const store = createStore(reducer) 
export default  StoreProvider = ({...props}) => <Provider store={store} {...props} />


