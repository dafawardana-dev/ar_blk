import React from 'react';

import { saveAs } from 'file-saver';

import axios from 'axios';


const FileDownload = () => {

  const downloadFile = async () => {

    try {

      const response = await axios.get('https://example.com/api/file', {

        responseType: 'blob', // Ensures the response is handled as binary data

      });


      // Save the file using file-saver

      saveAs(response.data, 'example-file.pdf');

    } catch (error) {

      console.error('Error downloading the file:', error);

    }

  };


  return (

    <div>

      <button onClick={downloadFile}>Download File</button>

    </div>

  );

};


export default FileDownload;
