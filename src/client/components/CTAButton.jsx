const CTAButton = ({ type, href, text, classes }) => {
  const btnClassType = type === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <a className={`btn scrollto ${btnClassType} ${classes}`} href={href}>
      {text}
    </a>
  );
};

export default CTAButton;
