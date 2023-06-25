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
        <div className="mt-5 grid grid-cols-6">
            <div className="col-span-1 mt-5">
                <button className={
                    "btn w-36 ml-4 " + (buttonChange==1 ? 'btn-secondary':'btn-primary')
                } onClick={handleButton1}>Dữ liệu tĩnh</button>
                <button className={
                    "btn w-36 ml-4 " + (buttonChange==2 ? 'btn-secondary':'btn-primary')
                } onClick={handleButton2}>Dữ liệu động</button>

            </div>
            {buttonChange==1 && <div className="col-span-3 border-l-8 border-gray-500 rounded-lg">
                <ImportButton elementName="Thông tin địa lý"/>
                <ImportButton elementName="Khoảng cách"/>
                <ImportButton elementName="Các loại bệnh dịch"/>
            </div>}
            {buttonChange==2 && <div className="col-span-3 border-l-8 border-gray-500 rounded-lg">
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
