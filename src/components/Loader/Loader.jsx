import { Overlay } from 'components';
import { BeatLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <Overlay>
      <BeatLoader color="#36d7b7" />;
    </Overlay>
  );
};
