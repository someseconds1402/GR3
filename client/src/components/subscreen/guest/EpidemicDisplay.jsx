import { useSelector, useDispatch } from 'react-redux';
import { changeEpidemicData, changeEpidemicOption } from '../../../store/reducer/changeEpidemicDataSlice';
import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { getEpidemicDataAPI } from '../../../service/userService'
import LineChart from '../../chart/LineChart';
import Dropdown from '../../dropdown/Dropdown';
import province from './../../../constant/province'
import MyDatePicker from '../../datepicker/DatePicker';

function EpidemicDisplay() {
  const EpidemicData = useSelector((state) => state.changeEpidemicData.data);
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
    dispatch(changeEpidemicData({data}));
    console.log({province_id, pandemic_id, date});
    console.log(data);
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

  const getData = ()=>{
    getEpidemicData(24, 2, "2022-7-18");
  }

  const changeOption = (order) => {
    dispatch(changeEpidemicOption({order: order}));
  }

  const changeProvince = (option)=>{
    const province_id = province.indexOf(option) + 1;
    localStorage.setItem('epidemicDisplay_selectedProvinceId', province_id);
    getEpidemicData(
      province_id, 2, 
      localStorage.getItem('epidemicDisplay_selectedDate')
    );
  }

  const changeDate = (date) => {
    localStorage.setItem('epidemicDisplay_selectedDate', date);
    getEpidemicData(
      localStorage.getItem('epidemicDisplay_selectedProvinceId'),
      2, date
    );
  }

  useEffect(()=>{
    // getEpidemicData(2, 2, "2022-7-18");
  })

  return (
    <MainFrame>
      <h1>Tra cứu tình hình dịch bệnh</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <div className="col-span-1 ">
          {/* <div className="mt-4 w-full btn btn-primary" onClick={getEpidemicData}>Lấy data</div> */}
          <Dropdown data={province} func={changeProvince}/>
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