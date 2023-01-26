import React from 'react'

function Search({props}) {
  return (
    <div>index</div>
  )
}
export async function getServerSideProps(context){
    const {query} = context;
    const {search} = query;

    return{
        props:{
            
        }
    }
}

export default Search