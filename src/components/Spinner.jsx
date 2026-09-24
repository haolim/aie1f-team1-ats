import { ClipLoader } from 'react-spinners';

export default function Spinner({ size = 32 }) {
  return (
    <p className="message" role="status" aria-live="polite">
      <ClipLoader size={size} color="#2f5d9e" />
      <span> Loading...</span>
    </p>
  );
}
