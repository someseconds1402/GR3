import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { getPandemicDataAPI, getSupplyQuantityOfAllProvincesAPI } from '../../../service/userService'
import Dropdown from '../../dropdown/Dropdown';
import province from '../../../constant/province'
import { useSelector, useDispatch } from 'react-redux';
import { changeSupplyDataAnalyse, sortWithAbility } from '../../../store/reducer/supplyDataAnalyseSlice';

// Excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import SupplyTable_New from './supplytable/SupplyTable_New';
import S_SMC_FCM from '../../../logic/sSMC_FCM';

function SupplyAnalyse_New() {
  const SupplyData = useSelector((state) => state.supplyDataAnalyse.data);
  const dispatch = useDispatch();

  const [pandemicData, setPandemicData] = useState([]);
  
  const [pandemicSelect, setPandemicSelect] = useState(1);
  const [dateSelect, setDateSelect] = useState("2022-07-15");

  const [isLoading, setIsLoading] = useState(false);

  const changePandemic = (option)=>{
    // console.log('pandemic', pandemicData);
    setPandemicSelect(2)
  }

  const changeDate = (date) => {
    setDateSelect(date);
  }

  const Clust = async () => {
    let U = SupplyData.map(e=>{
      return {
        province_id: e.province_id,
        province_name: e.province_name,
        population: e.population,
        population_density: e.population_density,
        level: e.level,
        ability: e.ability,
        kit_test: e.kit_test,
        vaccine: e.vaccine,
      }
    });
    // console.log(U);
    const C = [1, 2]; // Danh sách các nhãn cần phân cụm
    
    const tagField = 'level'; // Trường dữ liệu chứa nhãn
    
    const keys = ['province_name', 'province_id']; // Các trường dữ liệu không tham gia vào việc phân cụm
    
    // Tạo một đối tượng thuật toán phân cụm
    const algorithm = new S_SMC_FCM(U, C, tagField, keys);
    
    // Chạy thuật toán
    algorithm.run()
      .then(() => {
        // Khi thuật toán hoàn thành, lấy kết quả
        const result = algorithm.X;
        dispatch(changeSupplyDataAnalyse({data: result.map(e=>{
          return {
            province_id: e.province_id,
            province_name: e.province_name,
            population: e.population,
            population_density: e.population_density,
            level: e.level,
            ability: e.cluster_label,
            kit_test: e.kit_test,
            vaccine: e.vaccine,
          }
        })}))
        dispatch(sortWithAbility())
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
    const worksheet = XLSX.utils.json_to_sheet(SupplyData);
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
        const data = await getSupplyQuantityOfAllProvincesAPI(pandemicSelect);
        data.forEach(e=>{
          if(!e.ability){
            e.ability = 0;
          }
        })
        // console.log(data);
        const res = data.map(dt=>{
          const vaccineList = dt.data.filter(e=>e.supply_type=='vaccine');
          const kittestList = dt.data.filter(e=>e.supply_type=='kit test');
          let vaccineTotal = 0, kittestTotal = 0;
          // console.log(vaccineList, kittestList);
          vaccineList.forEach(e=>{
            vaccineTotal += e.quantity;
          })
          kittestList.forEach(e=>{
            kittestTotal += e.quantity;
          })

          return {
            province_id: dt.province_id,
            province_name: province[dt.province_id-1],
            population: dt.population,
            population_density: dt.population_density,
            level: dt.level,
            ability: dt.ability,
            kit_test: kittestTotal,
            vaccine: vaccineTotal,
          }
        });
        // console.log(res);
        dispatch(changeSupplyDataAnalyse({data: res}))
        
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
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <div className="btn btn-primary w-full mt-4" onClick={Clust}>Phân cụm</div>
          <div className="btn btn-success w-full mt-4" onClick={downloadFile}>Download dữ liệu</div>
        </div>
      </div>
      <div className="mt-5">
        <SupplyTable_New />

      </div>
    </MainFrame>
  )
}

export default SupplyAnalyse_New