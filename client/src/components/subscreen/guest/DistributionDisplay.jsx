import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';
import { getPandemicDataAPI, getSupplyQuantityOfAllProvincesAPI, getDistributionDataAPI } from '../../../service/userService'
import Dropdown from '../../dropdown/Dropdown';
import province from './../../../constant/province'
import Map from './map/Map';

function DistributionDisplay() {
  const navigate = useNavigate();
  const [pandemicData, setPandemicData] = useState([]);
  const [provinceSelect, setProvinceSelect] = useState(1);
  const [pandemicSelect, setPandemicSelect] = useState(1);
  const [supplyQuantity, setSupplyQuantity] = useState([])
  const [supplyType, setSupplyType] = useState([{id: -1, name: 'Chưa có dữ liệu'}]);
  const [supplyTypeSelect, setSupplyTypeSelect] = useState(-1);

  const [provinceList1, setProvinceList1] = useState([{
      pandemic_id: -1,
      province_id: -1,
      province_name: 'Chưa có dữ liệu',
      supply_type_id: -1,
      supply_quantity: 0,
      ability: 0
  }]);

  const [provinceList2, setProvinceList2] = useState([{
    pandemic_id: -1,
    province_id: -1,
    province_name: 'Chưa có dữ liệu',
    supply_type_id: -1,
    supply_quantity: 0,
    ability: 0
  }]);

  const changePandemic = (option)=>{
    setPandemicSelect(pandemicData.find(e=>e.pandemic_name==option).pandemic_id);
  }

  const changeProvince = (option)=>{
    const province_id = province.indexOf(option) + 1;
    setProvinceSelect(province_id);
  }

  const changeSupplyType = (option) => {
    setSupplyTypeSelect(supplyType.find(e=>e.name==option).id);
  }

  const drawTable = (label, quantity) => {
    return (
      <div className="grid grid-cols-3 items-center mx-3 px-2 h-16
        border shadow-xl rounded-lg dark:border-gray-700 bg-white">
        <div className='col-span-1'><strong>{label}</strong></div>
        <div className='col-span-1'><strong className=' ml-14'>{Math.floor(100*(Math.random()))}</strong></div>
        <div className='col-span-1'><input
                type="Weight"
                placeholder=""
                disabled
                className="w-full sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 h-162
                    focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-xl bg-gray-50"
                value={(quantity/(10+Math.random()*6)).toFixed(0)}
        /></div>
      </div>
    )
  }

  useEffect(() => {
    if(localStorage.getItem('role') != 2){
      navigate(PATH.HOME);
    }
    const fetchData = async () => {
      try {
        const pandemicDataSrevice = await getPandemicDataAPI();
        setPandemicData(pandemicDataSrevice);
        
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSupplyQuantityOfAllProvincesAPI(pandemicSelect);
        // console.log(data);
        if(data.listSupplyType.length > 0){
          setSupplyType(data.listSupplyType);
          setSupplyTypeSelect(0);
        } else {
          setSupplyTypeSelect(-1);
          setSupplyType([{id: -1, name: 'Chưa có dữ liệu'}]);
        }

        data.data.forEach(e=>{
          if(!e.ability){
            e.ability = 0;
          }
        })
        setSupplyQuantity(data.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pandemicSelect]);

  useEffect(() => {
    if(supplyTypeSelect != -1){
      const fetchData = async () => {
        try {
          const data = await getDistributionDataAPI(pandemicSelect, supplyTypeSelect);
          // console.log(data);
          let province1 = [], province2 = [];
          data.forEach(e=>{
            if(e.ability==1){
              province1.push({
                province_id: e.province_id,
                province_name: province[e.province_id],
                supply_quantity: e.supply_quantity
              });
            } else if(e.ability==3){
              province2.push({
                province_id: e.province_id,
                province_name: province[e.province_id],
                supply_quantity: e.supply_quantity
              });
            }
          })
          setProvinceList1(province1);
          setProvinceList2(province2);
          console.log(province1, province2);
          
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [supplyTypeSelect]);

  return (
    <MainFrame>
      <h1>Tra cứu đề xuất phân bổ VTYT</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <div className="col-span-1 ">
          <Dropdown data={pandemicData.map(e=>e.pandemic_name)} func={changePandemic} />
          <div className="mt-4"><strong>Loại vật tư y tế</strong></div>
          <div ><Dropdown data={supplyType.map(e=>e.name)} func={changeSupplyType}/></div>
          
        </div>
      </div>
      <div className="grid grid-cols-4 mt-5 border-t-2 border-gray-500 rounded-lg">
        <div className="col-span-1 mt-4">
          <div className=""><strong>Tỉnh thành nhận</strong></div>
          <Dropdown data={provinceList1.map(e=>e.province_name)} func={changeProvince} />
        </div>
        {supplyTypeSelect!=-1 && 
        <div className="col-span-3 mt-4 ml-1">
        <div className="mx-3"><strong>Tỉnh thành hỗ trợ</strong></div>
        <div className="grid grid-cols-3 items-center mx-3 px-2 h-14
          border shadow-xl rounded-t-lg bg-gray-700 text-white">
          <div className='col-span-1'><strong>Tỉnh thành phố</strong></div>
          <div className='col-span-1'><strong>Quãng đường (km)</strong></div>
          <div className='col-span-1'><strong>Số lượng Vật tư hỗ trợ</strong></div>
        </div>
        {provinceList2.map(e=>drawTable(e.province_name, e.supply_quantity))}
      </div>}
        {/* <Map/> */}
      </div>
    </MainFrame>
  )
}

export default DistributionDisplay