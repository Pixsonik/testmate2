import React, { Component } from 'react'

export class ErrorBoundary extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         error:null
      }
    }

    componentDidCatch(error,errorInfo){
        console.log('hello ',error,errorInfo)
    }

    static getDerivedStateFromError(error){
        return {error}
    }
  render() {
    if(this.state.error)
    return  <div style={{textAlign:"center",fontSize:"56px"}}>404 Error </div>

    return this.props.children
  }
}

export default ErrorBoundary