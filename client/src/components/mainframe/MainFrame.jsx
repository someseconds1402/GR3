import Sidebar from "../sidebar/Sidebar";

const MainFrame = ({ children }) => {
  return (
    <div>
        <Sidebar/>
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                {children}
            </div>
        </div>
    </div>
  );
};

export default MainFrame;
