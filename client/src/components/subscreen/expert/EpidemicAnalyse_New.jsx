import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';
import { getPandemicDataAPI, getEpidemicDataOfAllProvincesAPI } from '../../../service/userService'
import Dropdown from '../../dropdown/Dropdown';
import province from '../../../constant/province'
import MyDatePicker from '../../datepicker/DatePicker';
import { useSelector, useDispatch } from 'react-redux';
import { changeEpidemicDataAnalyse, sortWithLevel, resetAllLevel } from '../../../store/reducer/epidemicDataAnalyseSlice';

// Excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import WeightTable from './epidemictable/WeightTable';
import EpidemicTable_New from './epidemictable/EpidemicTable_New';
import S_SMC_FCM from '../../../logic/sSMC_FCM';
import WeightTableEpidemic from './epidemictable/WeightTableEpidemic';

function EpidemicAnalyse_New() {
  const navigate = useNavigate();
  const EpidemicData = useSelector((state) => state.epidemicDataAnalyse.data);
  const dispatch = useDispatch();

  const [pandemicData, setPandemicData] = useState([]);
  
  const [pandemicSelect, setPandemicSelect] = useState(1);
  const [dateSelect, setDateSelect] = useState("2022-07-15");

  const [isLoading, setIsLoading] = useState(false);
  const [showWeightTable, setShowWeightTable] = useState(false);
  const [weight, setWeight] = useState([1,1,1,1,1,1,1,1,1,1,1]);
  const [isShowWeight, setIsShowWeight] = useState(false);
  let weightList = {
    infection_new: 1,
    infection_average: 1,
    infection_total: 1,
    recovered_new: 1,
    recovered_average: 1,
    recovered_total: 1,
    death_new: 1,
    death_average: 1,
    death_total: 1,
    population: 1,
    population_density: 1,
  }

  const weightLabel = [
    'infection_new',
    'infection_average',
    'infection_total',
    'recovered_new',
    'recovered_average',
    'recovered_total',
    'death_new',
    'death_average',
    'death_total',
    'population',
    'population_density',
  ]

  const changePandemic = (option)=>{
    // console.log('pandemic', pandemicData);
    setPandemicSelect(2)
  }

  const changeDate = (date) => {
    setDateSelect(date);
  }

  const changeIsShowWeight = (event) => {
    setIsShowWeight(event.target.checked);
  }

  const closeDialog = (data)=>{
    // console.log(data);
    if(data){
      setWeight(data);
      weightLabel.forEach((e, index)=>{
        weightList[e] = data[index];
      });
      console.log(weightList);
    }
    setShowWeightTable(false);
  }

  const Clust = async () => {
    let U = EpidemicData.map(e=>{
      return {
        "province_id": e.province_id,
        "province_name": e.province_name,
        "population": e.population,
        "population_density": e.population_density,
        "level": e.level,
        "infection_new": e.infection_new,
        "infection_total": e.infection_total,
        "infection_average": e.infection_average,
        "recovered_new": e.recovered_new,
        "recovered_total": e.recovered_total,
        "recovered_average": e.recovered_average,
        "death_new": e.death_new,
        "death_total": e.death_total,
        "death_average": e.death_average,
      }
    });
    // console.log(U);
    const C = [1, 2, 3]; // Danh sách các nhãn cần phân cụm
    
    const tagField = 'level'; // Trường dữ liệu chứa nhãn
    
    const keys = ['province_name', 'province_id']; // Các trường dữ liệu không tham gia vào việc phân cụm
    
    // Tạo một đối tượng thuật toán phân cụm
    const algorithm = new S_SMC_FCM(U, C, tagField, keys, weightList);
    
    // Chạy thuật toán
    algorithm.run()
      .then(() => {
        // Khi thuật toán hoàn thành, lấy kết quả
        const result = algorithm.X;
        dispatch(changeEpidemicDataAnalyse({data: result.map(e=>{
          return {
            "province_id": e.province_id,
            "province_name": e.province_name,
            "population": e.population,
            "population_density": e.population_density,
            "level": e.cluster_label,
            "infection_new": e.infection_new,
            "infection_total": e.infection_total,
            "infection_average": e.infection_average,
            "recovered_new": e.recovered_new,
            "recovered_total": e.recovered_total,
            "recovered_average": e.recovered_average,
            "death_new": e.death_new,
            "death_total": e.death_total,
            "death_average": e.death_average,
          }
        })}))
        dispatch(sortWithLevel())
        console.log(result);
      })
      .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
      });
  }

  const downloadFile = () => {
    const currentTime = new Date().getTime();
    const fileName = `${currentTime}_EpidemicAnalyse.xlsx`;
    // Tạo workbook mới
    const workbook = XLSX.utils.book_new();

    // Convert data to worksheet format
    const worksheet = XLSX.utils.json_to_sheet(EpidemicData);
    // console.log(fileName, workbook, worksheet);
    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    // Write workbook to Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    // Create a Blob from the buffer
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // Download the file
    saveAs(blob, fileName);
  };

  useEffect(() => {
    if(localStorage.getItem('role') != 1){
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
        const res = data.map(dt=>{
          const infectionLst = dt.infection.list;
          const recoveredLst = dt.recovered.list;
          const deathLst = dt.death.list;
          let infectionAverage = 0;
          let recoveredAverage = 0;
          let deathAverage = 0;
    
          infectionLst.forEach(e=>{
            infectionAverage += e.quantity_in_today;
          });
          recoveredLst.forEach(e=>{
            recoveredAverage += e.quantity_in_today;
          });
          deathLst.forEach(e=>{
            deathAverage += e.quantity_in_today;
          });
    
          return {
            province_id: dt.province_id,
            province_name: province[dt.province_id-1],
            population: dt.population,
            population_density: dt.population_density,
            level: dt.level,
            infection_new: infectionLst[infectionLst.length-1].quantity_in_today,
            infection_total: infectionLst[infectionLst.length-1].total_quantity,
            infection_average: parseFloat((infectionAverage/(infectionLst.length)).toFixed(2)),
            recovered_new: recoveredLst[recoveredLst.length-1].quantity_in_today,
            recovered_total: recoveredLst[recoveredLst.length-1].total_quantity,
            recovered_average: parseFloat((recoveredAverage/(recoveredLst.length)).toFixed(2)),
            death_new: deathLst[deathLst.length-1].quantity_in_today,
            death_total: deathLst[deathLst.length-1].total_quantity,
            death_average: parseFloat((deathAverage/(deathLst.length)).toFixed(2)),
          }
        });
        dispatch(changeEpidemicDataAnalyse({data: res}))
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pandemicSelect, dateSelect]);


  return (
    <MainFrame>
      <h1>Phân tích tình hình dịch bệnh</h1>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="col-span-1">
          <Dropdown data={pandemicData.map(e=>e.pandemic_name)} func={changePandemic}/>
          <MyDatePicker func={changeDate}/>
          <div className="w-full mt-4">
            <label className='text-lg flex items-center'>
              <input className='h-6 w-6' type="checkbox" checked={isShowWeight} onChange={changeIsShowWeight} />
              <span className='ml-1'>Xem trọng số</span>
            </label>
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <div className="btn btn-primary w-full" onClick={()=>{setShowWeightTable(true)}}>Thiết lập trọng số</div>
          {showWeightTable && <WeightTableEpidemic data={weight} func={closeDialog}/>}
          <div className="btn btn-primary w-full mt-4" onClick={Clust}>Phân cụm</div>
          <div className="btn btn-success w-full mt-4" onClick={downloadFile}>Download dữ liệu</div>
        </div>
      </div>

      <div className="mt-5">
        <EpidemicTable_New weightData={weight} isShowWeight={isShowWeight} />

      </div>
    </MainFrame>
  )
}

export default EpidemicAnalyse_New