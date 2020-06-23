import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { CLIENT_FULFILLMENT_STATUSES, FULFILLMENT_STATUS } from '../constants';
import { updateRequestStatus, updateResolution } from '../api/requesters';
import ResolutionModal from './ResolutionModal';

function InfoWindow({ userData, isRequest }) {
  const { name, phone, address, fulfillment_status: dbFulfillmentStatus, id } = userData;
  const [showModal, setShowModal] = useState(false);
  const [fulfillmentStatus, setFulfillmentStatus] = useState(dbFulfillmentStatus);

  useEffect(() => {
    setFulfillmentStatus(dbFulfillmentStatus);
  }, [dbFulfillmentStatus]);

  const handleChangeRequestStatus = (newStatus) => {
    if (newStatus === FULFILLMENT_STATUS.RESOLVED) {
      setShowModal(true);
    } else {
      updateRequestStatus(id, newStatus);
    }
  };

  const handleCloseModal = () => {
    setFulfillmentStatus(dbFulfillmentStatus);
    setShowModal(false);
  };

  const handleComplete = () => {
    updateRequestStatus(id, FULFILLMENT_STATUS.RESOLVED);
    setShowModal(false);
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
          value={CLIENT_FULFILLMENT_STATUSES.find(({ value }) => value === fulfillmentStatus)}
          options={CLIENT_FULFILLMENT_STATUSES}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={({ value }) => handleChangeRequestStatus(value)}
        />
      )}
      <ResolutionModal
        id={id}
        onClose={handleCloseModal}
        onComplete={handleComplete}
        onUpdate={updateResolution}
        show={showModal}
        title="Select a resolution"
      />
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
