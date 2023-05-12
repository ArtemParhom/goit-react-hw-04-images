import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ closeModal, src, alt }) => {
  useEffect(() => {
    const clickEsc = evn => {
      if (evn.code === `Escape`) {
        closeModal();
        removeEventList();
      }
    };
    window.addEventListener('keydown', clickEsc);
    const removeEventList = () => {
      window.removeEventListener(`keydown`, clickEsc);
      return;
    };
  });
  return (
    <div
      className={css.Overlay}
      onClick={event => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
export default Modal;
