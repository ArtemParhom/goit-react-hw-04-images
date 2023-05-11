import css from './App.module.css';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import Modal from './modal/Modal';
import { useEffect, useState } from 'react';
import Notiflix from 'notiflix';

const Pixabay_KEY = '34339532-e640da46c9754c0f99dc11386';
const Pixabay_PER_PAGE = `12`;
const Pixabay_URL = `https://pixabay.com/api/?`;

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [arrayImages, setArrayImages] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [alt, setAlt] = useState('');

  const getPixabayApi = (value, page) => {
    const urlParams = new URLSearchParams({
      q: value,
      page: page,
      key: Pixabay_KEY,
      image_type: `photo`,
      orientation: `horizontal`,
      per_page: Pixabay_PER_PAGE,
    });
    return fetch(`${Pixabay_URL}&${urlParams}`);
  };

  const handelSubmit = inputValue => {
    if (inputValue.trim() === '') {
      Notiflix.Notify.failure('схоже що ви ввели пробіли замість cлова');
      return;
    }
    setArrayImages([]);
    setTotalPage(1);
    setPage(1);
    setInputValue(inputValue);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = (image, alt) => {
    setModal(!modal);
    setImage(image);
    setAlt(alt);
  };

  const closeModal = () => {
    setModal(!modal);
    setImage('');
    setAlt('');
  };

  useEffect(() => {
    if (page === 0) {
      return;
    }
    const fetchImage = async search => {
      setLoading(true);
      try {
        const data = await (await getPixabayApi(search, page)).json();
        setTotalPage(data.total);
        setArrayImages(prevArrayImages => [...prevArrayImages, ...data.hits]);
        if (data.hits.length === 0) {
          Notiflix.Notify.failure('за вашим запитом нічого не знайдено');
        }
      } catch {
        Notiflix.Notify.failure('помилка при завантаженні');
      } finally {
        setLoading(false);
      }
    };
    fetchImage(inputValue);
  }, [inputValue, page]);

  return (
    <div className={css.App}>
      <Searchbar handelSubmit={handelSubmit} />
      <ImageGallery openModal={openModal} arrayImages={arrayImages} />
      {loading && (
        <div className={css.Loader}>
          <Loader />
        </div>
      )}
      {arrayImages.length > 1 && totalPage / 12 > page ? (
        <Button onClick={loadMore} />
      ) : (
        ''
      )}
      {modal && <Modal closeModal={closeModal} src={image} alt={alt}></Modal>}
    </div>
  );
}
