import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { getSupplyQuantityAPI } from '../../../service/userService'
import Dropdown from '../../dropdown/Dropdown';
import province from './../../../constant/province'

function SuppliesDisplay() {
  const[supplyQuantity, getSupplyQuantity] = useState([]);

  // Lấy data pandemic từ localstorage
  const pandemicData = (localStorage.getItem('pandemicData'))
    .split('2018@4139,.abc/&xyz')
    .filter((item) => item !== '')
    .map(e=>{
      const [id, name] = e.split(':');
      return {
        pandemic_id: id,
        pandemic_name: name,
      }
    });
    
  localStorage.setItem('pandemicOption', 1);

  const getEpidemicData = async (province_id, pandemic_id) => {
    getSupplyQuantity(await getSupplyQuantityAPI(province_id, pandemic_id));
  }

  const changePandemic = (option)=>{
    getEpidemicData(
      localStorage.getItem('epidemicDisplay_selectedProvinceId'), 
      2, 
    );
  }

  const changeProvince = (option)=>{
    const province_id = province.indexOf(option) + 1;
    localStorage.setItem('epidemicDisplay_selectedProvinceId', province_id);
    getEpidemicData(
      province_id, 
      2, 
    );
  }

  const drawTableData = (data)=>{
    console.log(data);
    return (
          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th class="px-6 py-4 ">
              {data.supply_name}
            </th>
            <td class="px-6 py-4">
              {data.supply_type}
            </td>
            <td class="px-6 py-4">
              {data.quantity}
            </td>
          </tr>
    )
  }

  useEffect(()=>{
  })

  return (
    <MainFrame>
      <h1>Tra cứu số liệu Vật tư y tế</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <div className="col-span-1 ">
          <Dropdown data={province} func={changeProvince} />
          <Dropdown data={pandemicData.map(e=>e.pandemic_name)} func={changePandemic} />
        </div>
        <div className="col-span-3">
          
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table class="w-full text-lg text-left">
            <thead class="text-lg uppercase dark:bg-gray-900 dark:text-white dark:border-gray-700 border-b">
              <tr>
                <th class="px-6 py-3">
                  Tên
                </th>
                <th class="px-6 py-3">
                  Phân loại
                </th>
                <th class="px-6 py-3">
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