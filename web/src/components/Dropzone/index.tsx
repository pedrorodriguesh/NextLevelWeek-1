import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { FiUpload } from "react-icons/fi";

import "./styles.css";

const Dropzone = () => {

    const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0]

    const fileUrl = URL.createObjectURL(file)
    setSelectedFileUrl(fileUrl)

  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: {'image/png': ['.png'], 'image/jpg': ['.jpg'] } });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/png"/>

      {
        selectedFileUrl ? <img src={selectedFileUrl} alt="Imagem do estabelecimento" /> : (
            <p>
        <FiUpload />
        Imagem do estabelecimento
      </p>
        )
      }
    </div>
  );
};

export default Dropzone;
