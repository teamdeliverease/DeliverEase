import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { RESOLUTIONS, RESOLUTION_STATUSES } from '../constants';

export const RESOLUTION_COLORS = {
  [RESOLUTIONS.DELIVERED]: '#00C875',
  [RESOLUTIONS.NO_VOLUNTEER_FOUND]: '#E2445C',
  [RESOLUTIONS.REQUESTER_NOT_COMMUNICATING]: '#579BFC',
  [RESOLUTIONS.REJECTED]: '#9AADBD',
  [RESOLUTIONS.CANCELLED]: '#FAA1F1',
  [RESOLUTIONS.DUPLICATE]: '#CBB641',
};

function ResolutionModal({ show, onComplete, onClose, title, id }) {
  const handleUpdate = (newResolution) => {
    onComplete(id, newResolution);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="resolutionContainer">
          {RESOLUTION_STATUSES.map(({ label, value }) => (
            <button
              className="resolutionButton"
              style={{ backgroundColor: RESOLUTION_COLORS[value] }}
              type="button"
              onClick={() => handleUpdate(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}

ResolutionModal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default ResolutionModal;
