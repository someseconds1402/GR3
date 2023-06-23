import { useDispatch } from 'react-redux';
import { changeEpidemicData, changeEpidemicOption } from '../../../store/reducer/changeEpidemicDataSlice';
// import { changePandemicData } from '../../../store/reducer/getPandemicDataSlice';
import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { getEpidemicDataAPI, getPandemicDataAPI } from '../../../service/userService'
import LineChart from '../../chart/LineChart';
import Dropdown from '../../dropdown/Dropdown';
import province from './../../../constant/province'
import MyDatePicker from '../../datepicker/DatePicker';

function EpidemicDisplay() {
  // const EpidemicData = useSelector((state) => state.changeEpidemicData.data);
  // const pandemicData = useSelector(state => state.getPandemicData.data);

  // Lấy data pandemic từ localstorage
  const [pandemicData, setPandemicData] = useState([]);
    localStorage.setItem('pandemicOption', 1);
  
  const [provinceSelect, setProvinceSelect] = useState(1);
  const [pandemicSelect, setPandemicSelect] = useState(1);
  const [dateSelect, setDateSelect] = useState("2022-07-15");

  const dispatch = useDispatch();
  const [chartData, setChartData] = useState({
    labels: ['No name'],
    datasets: [
      {
        label: "No name",
        data: [0],
      }
    ]
  });

  const getEpidemicData = async (province_id, pandemic_id, date) => {
    const data = await getEpidemicDataAPI(province_id, pandemic_id, date);
    console.log({province_id, pandemic_id, date});
    dispatch(changeEpidemicData({data}));
    setChartData({
      labels: data.dateRange,
      datasets: [
        {
          label: data.infection.title,
          data: data.infection.list.map(e=>e.quantity_in_today),
          borderColor: 'blue',
          backgroundColor: 'blue'
        },
        {
          label: data.recovered.title,
          data: data.recovered.list.map(e=>e.quantity_in_today),
          borderColor: 'green',
          backgroundColor: 'green'
        },
        {
          label: data.death.title,
          data: data.death.list.map(e=>e.quantity_in_today),
          borderColor: 'red',
          backgroundColor: 'red'
        },
      ]
    })
  }

  const changeOption = (order) => {
    dispatch(changeEpidemicOption({order: order}));
  }

  const changePandemic = (option)=>{
    console.log('pandemic' + pandemicData);
    setPandemicSelect(2)
  }

  const changeProvince = (option)=>{
    const province_id = province.indexOf(option) + 1;
    setProvinceSelect(province_id);
  }

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
    getEpidemicData(provinceSelect, 2, dateSelect );
  }, [provinceSelect, pandemicSelect, dateSelect]);

  return (
    <MainFrame>
      <h1>Tra cứu tình hình dịch bệnh</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <div className="col-span-1 ">
          <Dropdown 
            data={province} func={changeProvince} 
            // selectedOption = {parseInt(localStorage.getItem('epidemicDisplay_selectedProvinceId'))}
          />
          <Dropdown data={pandemicData.map(e=>e.pandemic_name)} func={changePandemic} 
            // selectedOption={parseInt(localStorage.getItem('pandemicOption'))}
          />
          <MyDatePicker func={changeDate}/>
        </div>
        <div className="col-span-3">
          <LineChart data={chartData} />
        </div>
      </div>
    </MainFrame>
  )
}

export default EpidemicDisplay