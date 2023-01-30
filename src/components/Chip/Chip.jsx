import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export function Chip({ status, variant }) {
  return (
    <OverlayTrigger
      placement={'top'}
      overlay={<Tooltip id={`tooltip-top}`}>{status}</Tooltip>}
    >
      <span
        style={{
          backgroundColor: `${variant}`,
          color: '#fff',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
        }}
      >
        {status}
      </span>
    </OverlayTrigger>
  );
}
