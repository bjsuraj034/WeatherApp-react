import React from 'react'
import {assets} from './assets/assets'
import Wheather from './components/Wheather'

const App = () => {
  return (
    <div className='max-sm:py-10 py-28 min-h-screen grid bg-slate-200 justify-center items-center '> 
    <h1 className='text-center text-2xl p-5 mt-12 max-sm:text-xl'>Welcome to Wheather app👋</h1>

    <Wheather/>


    </div>
  )
}

export default App