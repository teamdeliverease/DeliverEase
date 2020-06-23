import { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { CLIENT_FULFILLMENT_STATUSES, FULFILLMENT_STATUS } from '../constants';
import { updateRequestStatus } from '../api/requesters';
import ResolutionModal from './ResolutionModal';

function InfoWindow({ userData, isRequest }) {
  const { name, phone, address, fulfillment_status, id } = userData;
  const [showModal, setShowModal] = useState(false);

  const handleChangeRequestStatus = (newStatus) => {
    if (newStatus === FULFILLMENT_STATUS.RESOLVED) {
      setShowModal(true);
    }
    updateRequestStatus(id, newStatus);
  };

  return (
    <div className="infoWindow">
      Name: {name}
      <br />
      Phone: {phone}
      <br />
      Address: {address}
      {isRequest && (
        <Select
          defaultValue={CLIENT_FULFILLMENT_STATUSES.find(
            ({ value }) => value === fulfillment_status,
          )}
          options={CLIENT_FULFILLMENT_STATUSES}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={({ value }) => handleChangeRequestStatus(value)}
        />
      )}
      <ResolutionModal
        title="Select a resolution"
        show={showModal}
        handleClose={() => setShowModal(false)}
      >
        Test Modal
      </ResolutionModal>
    </div>
  );
}

InfoWindow.propTypes = {
  isRequest: PropTypes.bool,
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    fulfillment_status: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

InfoWindow.defaultProps = {
  isRequest: false,
};

export default InfoWindow;
