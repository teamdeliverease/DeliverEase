const ThemedLink = ({ children, color = 'theme', bold = true, ...props }) => {
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
    <a href={props.href || '#'} className={`${elementClass}`} {...props}>
      {children}
    </a>
  );
  // href === undefined ? (
  //   <div className={`${elementClass}`} {...props}>
  //     {children}
  //   </div>
  // ) : (
  //   <a className={`${elementClass}`} {...props}>
  //     {children}
  //   </a>
  // )
  // }
  // )
};

export default ThemedLink;
