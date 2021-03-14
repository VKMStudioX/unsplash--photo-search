import React, { useState } from 'react'

const ModalContent = ({modalPhoto, modalPhotoId, closeModal}) => {
 
    const year = modalPhoto.created_at.split('-')[0]
    const month = modalPhoto.created_at.split('-')[1]

    const [imgFull, setImgFull] = useState(false)

    return (
    <div className="modal">
        {modalPhoto && modalPhoto.id === modalPhotoId ? 
        <>
            <div className='modal--content'>
                <span><b>Author:</b> {modalPhoto.user.name}</span>
                <button className='button' onClick={() => closeModal()}>Close</button>
            </div>
            <div className='modal--content'><b>Created at:</b>&nbsp; 
            {
            month === '01' ? "January"  :
            month === '02' ? "February" :
            month === '03' ? "March" :
            month === '04' ? "April" :
            month === '05' ? "May" :
            month === '06' ? "June" :
            month === '07' ? "July" :
            month === '08' ? "August" :
            month === '09' ? "September" :
            month === '10' ? "October" :
            month === '11' ? "November" :
            month === '12' ? "December" :
            null
            } - {year}</div>
            <div className='modal--content'><b>Location:</b> {modalPhoto.location.name ? modalPhoto.location.name : 'Unknown'}</div>
                <img
                    className={imgFull ? "modal--image-full" : "modal--image"}
                    alt={modalPhoto.alt_description}
                    src={modalPhoto.urls.regular}
                    onClick={() => setImgFull(!imgFull)}
                />
        </>
        : 'Loading photo...'}
    </div>
    )
}

export default ModalContent
