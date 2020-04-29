const ThemedLink = ({ children, color = 'theme', bold = true, href = '', ...props }) => {
  // TODO make this a styled component?

  let elementClass = '';
  switch (color) {
    case 'theme':
      elementClass = 'link-themed';
      break;
    case 'white':
      elementClass = 'link-white';
      break;
    case 'blue':
      elementClass = 'link-blue';
      break;
    default:
  }

  if (bold) elementClass += ' font-weight-bold';

  return (
    <a className={`${elementClass}`} href={href} {...props}>
      {children}
    </a>
  );
};

export default ThemedLink;
