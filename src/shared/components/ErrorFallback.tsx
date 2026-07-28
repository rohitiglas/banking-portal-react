import type { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    const message =
    error instanceof Error ? error.message : "An unknown error occurred";
    return(
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}
export default ErrorFallback;