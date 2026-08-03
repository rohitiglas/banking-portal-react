type Props = {
    message: string;
    retry: () => void;
};

const TransactionError = ({
    message,
    retry
}: Props) => {

    return (

        <div className="error-card">

            <h2>Failed to load transactions</h2>

            <p>{message}</p>

            <button onClick={retry}>
                Retry
            </button>

        </div>

    );

};

export default TransactionError;