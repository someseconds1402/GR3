import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import Dropdown from '../../dropdown/Dropdown';
import province from './../../../constant/province'

function DistributionDisplay() {

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
    // getSupplyQuantity(await getSupplyQuantityAPI(province_id, pandemic_id));
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

      </div>
    </MainFrame>
  )
}

export default DistributionDisplay