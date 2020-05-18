import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ThemedLink from './ThemedLink';

const PrivacyModal = ({ title, linkText, linkColor, bold = false, ...props }) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ThemedLink color={linkColor} onClick={handleShow} bold={bold}>
        {linkText}
      </ThemedLink>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PrivacyModal;
