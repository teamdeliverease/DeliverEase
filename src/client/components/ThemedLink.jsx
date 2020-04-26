//TODO DSE: text-orange is not working
const ThemedLink = ({ href, text }) => {
  return (
    <a className="text-orange font-weight-bold" target="_blank" href={href}>
      {text}
    </a>
  );
};

export default ThemedLink;
