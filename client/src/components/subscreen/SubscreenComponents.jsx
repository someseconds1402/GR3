import AccManage from "./admin/AccManage";
import DbModify from "./expert/DbModify";
import DistributionAnalyse from "./expert/DistributionAnalyse";
import EpidemicAnalyse from "./expert/EpidemicAnalyse";
import SupplyAnalyse from "./expert/SupplyAnalyse";
import DistributionDisplay from "./guest/DistributionDisplay";
import EpidemicDisplay from "./guest/EpidemicDisplay";
import SuppliesDisplay from "./guest/SuppliesDisplay";

const SubscreenComponents = {
    ADMIN: {
        AccManage,
    },
    EXPERT: {
        DbModify,
        DistributionAnalyse,
        EpidemicAnalyse,
        SupplyAnalyse,
    },
    GUEST: {
        DistributionDisplay,
        EpidemicDisplay,
        SuppliesDisplay,
    }
};

export default SubscreenComponents;