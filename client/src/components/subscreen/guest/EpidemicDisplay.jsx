import { useSelector, useDispatch } from 'react-redux';
import { changeEpidemicData, changeEpidemicOption } from '../../../store/reducer/changeEpidemicDataSlice';
import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { getEpidemicDataAPI } from '../../../service/userService'
import LineChart from '../../chart/LineChart';

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

  const queryData = async (province_id, pandemic_id, date) => {
    const data = await getEpidemicDataAPI(province_id, pandemic_id, date);
    dispatch(changeEpidemicData({data}));
    setChartData({
      labels: data.dateRange,
      datasets: [{
          label: data.infection.title,
          data: data.infection.list.map(e=>e.quantity_in_today),
          // borderColor: 'red'
        }]
    })
  }

  const getEpidemicData = ()=>{
    queryData(2, 2, "2022-7-18");
  }

  const changeOption = (order) => {
    dispatch(changeEpidemicOption({order: order}));
  }

  useEffect(()=>{
    // queryData(2, 2, "2022-7-18");
  })

  return (
    <MainFrame>
      <h1>EpidemicDisplay</h1>
      <div className="row mt-3 login btn btn-primary" onClick={getEpidemicData}>
        Lấy data
      </div>
      <LineChart data={chartData} />
    </MainFrame>
  )
}

export default EpidemicDisplay