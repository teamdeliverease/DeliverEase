const CTAButton = ({ type, href, text }) => {
  const btnClassType = type === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <a className={`btn scrollto ${btnClassType}`} href={href}>
      {text}
    </a>
  );
};

export default CTAButton;
