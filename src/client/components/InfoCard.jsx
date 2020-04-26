const InfoCard = ({ image, title, text }) => {
  return (
    <div className="item col-12 col-md-6 col-lg-6">
      <div className="item-inner p-3 p-lg-4">
        <div className="item-header mb-3">
          <div className="item-icon mb-3">
            <img className="img-fluid" src={image} height="50" width="65" alt="notepad" />
          </div>
          <h3 className="item-heading"> {title} </h3>
        </div>
        <div className="item-desc"> {text} </div>
      </div>
    </div>
  );
};

export default InfoCard;
