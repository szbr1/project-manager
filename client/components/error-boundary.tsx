"use client"
import React, { Component, ErrorInfo } from "react";
import { Button } from "./ui/button";

interface Props {
    children: React.ReactNode,
    fallback?: React.ReactNode
   
}
interface State {
     hasError: boolean,
     error: Error | null 
}

class ErrorBoundary extends Component<Props, State>{
    constructor(props: Props){
        super(props);

        this.state = {
             hasError: false,
             error: null
        }
    }
    static getDerivedStateFromError(error: Error):State {
        return {
            hasError: true,
            error
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error("Error caught:", error, errorInfo)
    }
    
    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null
        })
    }
    render() {
  if (this.state.hasError) {
    if (this.props.fallback) {
      return this.props.fallback;
    }

    return (
      <div className="flex h-screen w-full flex-col items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>

          <div className="flex gap-3 justify-center">
            <Button onClick={this.handleReset} size="sm">
              Try Again
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => (window.location.href = "/")}
            >
              Go to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return this.props.children;
}

   

}

export default React.memo(ErrorBoundary);