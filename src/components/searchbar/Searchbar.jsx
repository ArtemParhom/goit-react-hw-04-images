import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar(props) {
  const [inputValue, setInputValue] = useState('');

  const onChangeInput = event => {
    setInputValue(event.currentTarget.value);
  };

  const resetState = () => {
    setInputValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form
        className={css.SearchForm}
        onSubmit={event => {
          event.preventDefault();
          !inputValue ? alert('Введіть текст') : props.handelSubmit(inputValue);
          resetState();
        }}
      >
        <button type="submit" className={css.SearchFormButton}></button>

        <input
          onChange={onChangeInput}
          className={css.SearchFormInput}
          name="inputValue"
          value={inputValue}
          type="text"
          autoComplete="off"
          autoFocus
          placeolder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  handelSubmit: PropTypes.func.isRequired,
};
