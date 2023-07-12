import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';
import { getSupplyQuantityAPI, getPandemicDataAPI } from '../../../service/userService'
import Dropdown from '../../dropdown/Dropdown';
import province from './../../../constant/province'
import IconWithTooltip from '../../tooltip/IconWithTooltip';
import Map from './map/Map';

function DistributionDisplay() {
  const navigate = useNavigate();
  const[supplyQuantity, getSupplyQuantity] = useState([]);
  const [pandemicData, setPandemicData] = useState([]);
  const [provinceSelect, setProvinceSelect] = useState(1);
  const [pandemicSelect, setPandemicSelect] = useState(1);
  let province1 = []
  let province2 = []
  province.forEach((e,index)=>{
    if(index%3 ==0 || index%7==0){
      province1.push(e);
    } else if(index%5==0 || index%4==0){
      province2.push(e)
    }
  })

  const getSupplyQuantityData = async (province_id, pandemic_id) => {
    getSupplyQuantity(await getSupplyQuantityAPI(province_id, pandemic_id));
  }

  const changePandemic = (option)=>{
    console.log('pandemic' + pandemicData);
    setPandemicSelect(2)
  }

  const changeProvince = (option)=>{
    const province_id = province.indexOf(option) + 1;
    setProvinceSelect(province_id);
  }

  const drawTableData = (data)=>{
    console.log(data);
    return (
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th className="px-6 py-4 ">
              {data.supply_name}
            </th>
            <td className="px-6 py-4">
              {data.supply_type}
            </td>
            <td className="px-6 py-4">
              {data.quantity}
            </td>
          </tr>
    )
  }

  useEffect(() => {
    if(localStorage.getItem('role') != 2){
      navigate(PATH.HOME);
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pandemicDataSrevice = await getPandemicDataAPI();
        setPandemicData(pandemicDataSrevice);
        
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
    getSupplyQuantityData(provinceSelect, 2 );
  }, [provinceSelect, pandemicSelect]);

  return (
    <MainFrame>
      <h1>Tra cứu đề xuất phân bổ VTYT</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <div className="col-span-1 ">
          <Dropdown data={pandemicData.map(e=>e.pandemic_name)} func={changePandemic} />
          <div className="mt-4">Tỉnh thành nhận</div>
          <Dropdown data={province1} func={changeProvince} />
          <div className="mt-4">Tỉnh thành hỗ trợ</div>
          <Dropdown data={province2} func={changeProvince} />
        </div>
        <div className="col-span-3">
          <Map/>
        </div>
      </div>
    </MainFrame>
  )
}

export default DistributionDisplay