import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DropdownSupplyAnalyse from '../../../dropdown/DropdownSupplyAnalyse';

const SupplyTable_New = (props) => {
  const SupplyData = useSelector((state) => state.supplyDataAnalyse.data);
  const colors = ['white', '#b5f5e1', '#d1c7ff', '#f0b4bc'];

  return (
    <table className="border w-full">
      <thead className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
        <tr>
          <th className="border border-black p-2">Thành phố</th>
          <th className="border border-black p-2">Dân số</th>
          <th className="border border-black p-2">Mật độ dân số</th>
          <th className="border border-black p-2">Cấp độ dịch</th>
          <th className="border border-black p-2">Số lượng vắc xin</th>
          <th className="border border-black p-2">Số lượng kit test</th>
          <th className="border border-black p-2">Khả năng hỗ trợ VTYT</th>
        </tr>
      </thead>
      <tbody>
        {SupplyData.map((row, index) => (
          <tr key={index} style={{ backgroundColor: colors[row.ability] }}>
            <td className="border border-black p-2">{row.province_name}</td>
            <td className="border border-black p-2">{row.population}</td>
            <td className="border border-black p-2">{row.population_density}</td>
            <td className="border border-black p-2">{row.level}</td>
            <td className="border border-black p-2">{row.vaccine}</td>
            <td className="border border-black p-2">{row.kit_test}</td>
            <td className="border border-black p-2"><DropdownSupplyAnalyse selectOption={row.ability} provinceId={row.province_id} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SupplyTable_New;
