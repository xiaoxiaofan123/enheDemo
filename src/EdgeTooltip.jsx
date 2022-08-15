const EdgeTooltip = ({ x, y, data }) => {
    return (
      <div className="edgeTooltips" style={{ position: 'absolute', top: `${y}px`, left: `${x}px` }}>
        <p>{`amount transferred: ${data?.amount_transferred}`}</p>
        <p>{`amount transferred unit: ${data?.amount_transferred_unit}`}</p>
      </div>
    )
  }

  export default EdgeTooltip