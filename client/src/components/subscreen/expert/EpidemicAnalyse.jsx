import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { getEpidemicDataAPI, getPandemicDataAPI, getEpidemicDataOfAllProvincesAPI } from '../../../service/userService'
import LineChart from '../../chart/LineChart';
import Dropdown from '../../dropdown/Dropdown';
import province from './../../../constant/province'
import MyDatePicker from '../../datepicker/DatePicker';
import EpidemicTable from './epidemictable/EpidemicTable';

function EpidemicAnalyse() {

  const [pandemicData, setPandemicData] = useState([]);
  
  const [provinceSelect, setProvinceSelect] = useState(1);
  const [pandemicSelect, setPandemicSelect] = useState(1);
  const [dateSelect, setDateSelect] = useState("2022-07-15");

  const [superData, setSuperData] = useState([]);
  const [tableData, setTableData] = useState({});
  const levelList = ['Chưa xác định', 'Cấp 1', 'Cấp 2', 'Cấp 3'];
  const [levelSelect, setLevelSelect] = useState(levelList[0]);

  const [level1, setLevel1] = useState(0);
  const [level2, setLevel2] = useState(0);
  const [level3, setLevel3] = useState(0);
  
  const changePandemic = (option)=>{
    // console.log('pandemic', pandemicData);
    setPandemicSelect(2)
  }

  const changeProvince = (option)=>{
    const province_id = province.indexOf(option) + 1;
    setLevelSelect(0)
    setProvinceSelect(province_id);
  }

  const changeLevel = (option) => {
    setSuperData((prevData) => {
      const newData = prevData.map((e) => {
        if (e.province_id === provinceSelect) {
          return { ...e, level: levelList.indexOf(option) };
        }
        return e;
      });
      return newData;
    });
  };

  const changeDate = (date) => {
    setDateSelect(date);
  }

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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEpidemicDataOfAllProvincesAPI(pandemicSelect, dateSelect);
        data.forEach(e=>{
          if(!e.level){
            e.level = 0;
          }
        })
        setSuperData(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pandemicSelect, dateSelect]);

  useEffect(() => {
    if(superData && superData.length > 0){
      const data = superData.find(e=>e.province_id==provinceSelect);
      setLevelSelect(data.level);
      setTableData(data);
    }
  }, [provinceSelect]);
  
  useEffect(()=>{
    setLevel1(superData.filter(e=>e.level==1).length);
    setLevel2(superData.filter(e=>e.level==2).length);
    setLevel3(superData.filter(e=>e.level==3).length);
  },[superData])


  return (
    <MainFrame>
      <h1>Phân tích tình hình dịch bệnh</h1>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="col-span-1 flex justify-between">
          <Dropdown data={pandemicData.map(e=>e.pandemic_name)} func={changePandemic} 
          />
        </div>
        <div className="col-span-1 flex justify-between">
          <Dropdown 
            data={province} func={changeProvince} 
          />
        </div>
        <div className="col-span-1 flex justify-between">
          <MyDatePicker func={changeDate}/>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="col-span-1 mt-5">
          <h3>Thống kê:</h3>
          <div className="mt-3">Cấp độ 1: {level1}</div>
          <div className="mt-3">Cấp độ 2: {level2}</div>
          <div className="mt-3">Cấp độ 3: {level3}</div>
          {(level1>1 && level2>1 && level3>1) ? (
            <div className="btn btn-success mt-5">Phân cụm</div>
          ) : (
            <div className="mt-4 text-blue-900">Khi đã xác định được mỗi level có ít nhất 2 tỉnh thành, có thể thực hiện phân cụm nhanh.</div>
          )
          }
          
        </div>
        <div className="col-span-2 mt-4">
          <EpidemicTable data={tableData} func={changeLevel} selectOption={levelSelect}/>
        </div>
      </div>
    </MainFrame>
  )
}

export default EpidemicAnalyse