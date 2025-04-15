'use client'

import { useEffect } from 'react'
import Modal from 'react-modal'
import CloseIcon from '@/app/assets/icons/CloseIcon'

interface IImageModal {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  alt?: string
}

const ImageModal = ({ isOpen, onClose, imageSrc, alt }: IImageModal) => {
  useEffect(() => {
    Modal.setAppElement('body')
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center"
      className="bg-primary-500 dark:bg-zinc-900 rounded-lg p-1.5 shadow-lg outline-none max-w-[90vw] relative max-h-[90vh] flex flex-col items-end z-50 translate-y-10 border-4 border-secondary-600"
    >
      <button
        onClick={onClose}
        className="text-zinc-500 hover:text-zinc-700 mb-2 absolute top-1 right-1 z-50 w-fit h-fit border-none p-0 hover:scale-110 transition duration-200 ease-in-out"
      >
        <CloseIcon className='fill-primary-100'/>
      </button>
      <img
        src={imageSrc}
        alt={alt || 'Imagem'}
        className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-md"
      />
    </Modal>
  )
}

export default ImageModal
