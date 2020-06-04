const CTAButton = ({ type, href, text, classes, onClick }) => {
  const btnClassType = type === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <a className={`btn scrollto ${btnClassType} ${classes}`} href={href} onClick={onClick}>
      {text}
    </a>
  );
};

export default CTAButton;
