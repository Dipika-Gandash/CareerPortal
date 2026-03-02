const SocialLink = ({ label, url }) => {
  return (
    <p>
      <span className="font-medium">{label}:</span>{" "}
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline break-all"
        >
          {url}
        </a>
      ) : (
        <span className="text-gray-500">Not added</span>
      )}
    </p>
  );
};

export default SocialLink;