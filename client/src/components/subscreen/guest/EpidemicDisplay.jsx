import React from 'react'
import MainFrame from '../../mainframe/MainFrame'
import { getEpidemicDataAPI } from '../../../service/userService'

function EpidemicDisplay() {

  const getEpidemicData = async (event)=>{
    const data = await getEpidemicDataAPI();
    console.log(data);
  }

  return (
    <MainFrame>
      <h1>EpidemicDisplay</h1>
      <div className="row mt-3 login btn btn-primary" onClick={getEpidemicData}>
              Lấy data
            </div>
    </MainFrame>
  )
}

export default EpidemicDisplay