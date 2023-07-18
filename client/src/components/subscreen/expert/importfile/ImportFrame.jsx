import React, {useState} from 'react';
import ImportButton from './ImportButton';

const ImportFrame = () => {
    const [buttonChange, setButtonChange] = useState(1);

    const handleButton1 = ()=>{
        setButtonChange(1);

    }

    const handleButton2 = ()=>{
        setButtonChange(2);

    }

    return (
        <div className="mt-5">
            <div className="flex justify-center items-end mt-5">
                <button className={
                    "rounded-t-lg " + (buttonChange==1 ? 'border-solid border-2 border-gray-500 w-40 h-11':' bg-gray-300 w-36 h-10')
                } onClick={handleButton1}>Dữ liệu tĩnh</button>
                <button className={
                    "rounded-t-lg " + (buttonChange==2 ? 'border-solid border-2 border-gray-500 w-40 h-11':' bg-gray-300 w-36 h-10')
                } onClick={handleButton2}>Dữ liệu động</button>
            </div>
            {buttonChange==1 && <div className="grid grid-cols-3 border-t-2 border-gray-500 rounded-lg">
                <ImportButton elementName="Thông tin địa lý"/>
                <ImportButton elementName="Khoảng cách"/>
                <ImportButton elementName="Các loại bệnh dịch"/>
            </div>}
            {buttonChange==2 && <div className="grid grid-cols-3 border-t-2 border-gray-500 rounded-lg">
                <ImportButton elementName="Số lượng nhiễm"/>
                <ImportButton elementName="Số lượng hồi phục"/>
                <ImportButton elementName="Số lượng tử vong"/>
                <ImportButton elementName="Cấp độ dịch"/>
                <ImportButton elementName="Số lượng vật tư y tế"/>
                <ImportButton elementName="Khả năng cung ứng VTYT"/>
            </div>}
        </div>
    );
};

export default ImportFrame;
