import React, { useState, useContext, useEffect, useRef, useLayoutEffect } from 'react'
import { StoreContext } from '../Store/StoreProvider'
import Modal from 'react-modal';
import ModalContent from '../components/ModalContent'
import Header from '../components/Header'
import Search from '../components/Search'

const Results = () => {

    const { query, photos, modalPhoto, page, setPage, setSearch, setModalPhotoId, modalPhotoId } = useContext(StoreContext);
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    const photosRef = useRef()

    Modal.setAppElement('#root');

    useLayoutEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
  
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, [scrollPosition]);


    useEffect(() => {
      const scrollToNewData = photosRef.current.scrollHeight-2000
      if(scrollPosition >= scrollToNewData ) {
        let nextPage = page+1
        setPage(nextPage)
        setSearch(true)
        console.log('added')
    }
    }, [photosRef, scrollPosition]);

    const openModal = (photoId) => {
      setModalPhotoId(photoId)
      setModalIsOpen(true)
    }

    const closeModal = () => {
      setModalIsOpen(false);
    }

    return (
    <div className='results'>
      <Header/>
      <Search/>
      <h1 className='title'>{query}</h1>
      <div className="card-list" ref={photosRef}>
        {photos.map((photo) =>
          <div className="card" key={photo.id}>
            <img
              className="card--image"
              alt={photo.alt_description}
              src={photo.urls.regular}
              width="50%"
              height="50%"
              onClick={() => openModal(photo.id)}
            ></img>
          </div>)};
      </div> 

      {modalPhoto ? 
          <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Photo Modal"
        >
          <ModalContent 
          modalPhoto={modalPhoto}
          modalPhotoId={modalPhotoId} 
          closeModal={closeModal} />
        </Modal>
      : null}
    </div>
    )
}

export default Results
