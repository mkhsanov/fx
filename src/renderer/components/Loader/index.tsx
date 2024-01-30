import Loader from 'react-loaders';

import './styles.scss';

const CustomLoader = () => {
  return (
    <div className="Loader">
      <Loader type="ball-scale-ripple" active={true} />
    </div>
  );
};

export default CustomLoader;
