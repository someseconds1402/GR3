import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';

const ImportButton = (props) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImport = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      if (workbook.SheetNames.length === 0) {
        setErrorMessage('Invalid file format. Please select an Excel file.');
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setErrorMessage('');
    };

    fileReader.readAsArrayBuffer(file);
  };

  const handleReadData = () => {
    if (!selectedFile) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      const data = new Uint8Array(arrayBuffer);
      const workbook = await XLSX.read(data, { type: 'array' });

      // Đọc dữ liệu từ sheet đầu tiên (sheet index = 0)
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Sử dụng XLSX.utils.sheet_to_json để chuyển đổi sheet thành mảng JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log('Dữ liệu:', jsonData);
    };

    fileReader.readAsArrayBuffer(selectedFile);

    setTimeout(() => {
      alert('Đã xảy ra lỗi! \nDữ liệu bạn tải lên gây xung đột với dữ liệu trong hệ thống.')
    }, 1000);
  };

  const handleDelete = () => {
    setSelectedFile(null);
    setErrorMessage('');
  };

  return (
    <div>
      <div className="grid grid-cols-8 mt-5">
        <div className="col-span-3 pl-4"><h5>{props.elementName}</h5></div>
        <div className="col-span-4"><hr /></div>
      </div>
      {!selectedFile && 
        <button className="btn btn-primary w-36 ml-4" onClick={handleImport}>
          Thêm file
        </button>}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {selectedFile && (
        <div className=''>
          <p>Selected file: {selectedFile.name}</p>
          <button className="btn btn-danger w-36 ml-4" onClick={handleDelete}>
            Xóa
          </button>
          <button className="btn btn-success w-64 ml-4" onClick={handleReadData}>
            Cập nhật dữ liệu lên CSDL
          </button>
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ImportButton;