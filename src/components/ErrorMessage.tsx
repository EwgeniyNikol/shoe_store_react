interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="text-center py-4">
      <div className="text-danger mb-2">{message}</div>
      {onRetry && (
        <button className="btn btn-outline-primary btn-sm" onClick={onRetry}>
          Повторить
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;