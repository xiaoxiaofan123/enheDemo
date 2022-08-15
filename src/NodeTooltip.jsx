const NodeTooltip = ({ x, y, data }) => {
    return (
      <div className="nodeTooltips" style={{ position: 'absolute', top: `${y}px`, left: `${x}px` }}>
        <p>{`operator note: ${data?.operator_note}`}</p>
        <p>{`solution name: ${data?.solution_name || '-'}`}</p>
        <p>{`inventory location: ${data?.inventory_location}`}</p>
      </div>
    )
  }

  export default NodeTooltip