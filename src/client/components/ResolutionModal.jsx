import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { RESOLUTION_COLORS, RESOLUTION_STATUSES } from '../constants';

function ResolutionModal({ show, onComplete, onClose, onUpdate, title, id }) {
  const handleUpdate = (newResolution) => {
    onUpdate(id, newResolution);
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
  onUpdate: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default ResolutionModal;
