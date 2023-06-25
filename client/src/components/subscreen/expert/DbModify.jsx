import MainFrame from '../../mainframe/MainFrame'
import ImportFrame from './importfile/ImportFrame'

function DbModify() {
  return (
    <MainFrame>
      <h1>Thêm dữ liệu vào hệ thống</h1>
      <ImportFrame/>
    </MainFrame>
  )
}

export default DbModify