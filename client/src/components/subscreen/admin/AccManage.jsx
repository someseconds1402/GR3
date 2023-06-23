import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame';
import allEmail from './testData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAllEmail } from '../../../service/userService';

function AccManage() {
  const [allEmail, setAllEmail] = useState([]);
  // localStorage.setItem('allEmail', JSON.stringify([]));
  // const listEmail = JSON.parse(localStorage.getItem('allEmail'));
  const [inputSearch, setInputSearch] = useState('');
  const [displayEmailList, setDisplayEmailList] = useState(allEmail);

  console.log(displayEmailList);

  const filterEmail = (event) => {
    console.log(displayEmailList);
    const inputValue = event.target.value;
    setInputSearch(event.target.value);
    const filterList = allEmail.filter(e=>e.email.includes(inputValue));
    setDisplayEmailList(filterList);
  }

  const handleDeleteEmail = (order)=>{
    console.log(order);
  }

  useEffect(() => {
    if(!localStorage.getItem('role')){
      localStorage.setItem('role', 2);
    }
    const fetchData = async () => {
      try {
        const allEmailService = await getAllEmail(localStorage.getItem('email'));
        setAllEmail(allEmailService);
        setDisplayEmailList(allEmailService)
        // localStorage.setItem('allEmail', JSON.stringify(allEmail));
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <MainFrame>
      <h1>Quản lý tài khoản</h1>
      <div className="grid grid-cols-1 gap-4 mt-5">
        <div className="col-span-1">
          <input
            type="text"
            value={inputSearch}
            className="border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full h-14"
            placeholder="Tìm kiếm"
            onChange={filterEmail}
          />
        </div>
      </div>

      <div className="">
        <div className="shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-lg text-left">
            <tbody>
              {displayEmailList.map(e=>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th className="px-6 py-4 ">
                    {e.email}
                  </th>
                  <td className="px-6 py-4">
                    <button onClick={()=>handleDeleteEmail(e.order)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </MainFrame>
      
  )
}

export default AccManage