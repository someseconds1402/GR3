import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';
import { getSupplyQuantityAPI, getPandemicDataAPI } from '../../../service/userService'
import Dropdown from '../../dropdown/Dropdown';
import province from './../../../constant/province'
import IconWithTooltip from '../../tooltip/IconWithTooltip';

function SuppliesDisplay() {
  const navigate = useNavigate();
  const [supplyQuantity, setSupplyQuantity] = useState([]);
  const [pandemicData, setPandemicData] = useState([]);
  const [provinceSelect, setProvinceSelect] = useState(1);
  const [pandemicSelect, setPandemicSelect] = useState(1);

  const getSupplyQuantityData = async (province_id, pandemic_id) => {
    setSupplyQuantity(await getSupplyQuantityAPI(province_id, pandemic_id));
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

  useEffect(()=>{
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
      <h1>Tra cứu số liệu Vật tư y tế</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <div className="col-span-1 ">
          <Dropdown data={province} func={changeProvince} />
          <Dropdown data={pandemicData.map(e=>e.pandemic_name)} func={changePandemic} />
        </div>
        <div className="col-span-3">
          
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-lg text-left">
            <thead className="text-lg uppercase dark:bg-gray-900 dark:text-white dark:border-gray-700 border-b">
              <tr>
                <th className="px-6 py-3">
                  Tên
                </th>
                <th className="px-6 py-3">
                  Phân loại
                </th>
                <th className="px-6 py-3">
                  Số lượng
                </th>
              </tr>
            </thead>
            <tbody>
            {supplyQuantity.map(e=>drawTableData(e))}
            </tbody>
          </table>
        </div>

        </div>
      </div>
    </MainFrame>
  )
}

export default SuppliesDisplay