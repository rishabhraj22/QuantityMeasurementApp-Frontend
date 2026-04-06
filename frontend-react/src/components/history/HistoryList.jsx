function HistoryList({ history }) {
  return (
    <div className="history-box">
      <h3>Calculation History</h3>

      {history.length === 0 ? (
        <p className="empty-history">No history available</p>
      ) : (
        <div className="history-list">
          {history.map((item, index) => (
            <div className="history-item" key={index}>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Action:</strong> {item.action}</p>
              <p><strong>Expression:</strong> {item.expression}</p>
              <p><strong>Result:</strong> {item.result}</p>
              <p><strong>Time:</strong> {item.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HistoryList