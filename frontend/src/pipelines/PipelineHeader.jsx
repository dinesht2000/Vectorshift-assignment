import { Cable, Menu, X, Trash2 } from "lucide-react";
import { clearCanvas } from "../store/nodesSlice";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { SubmitButton } from "../SubmitButton";


const PipelineHeader = ({ }) => {
  const dispatch = useDispatch();

    const onClearCanvas = useCallback(() => {
    dispatch(clearCanvas());
  }, [dispatch]);


  return (
    <header className="bg-[linear-gradient(to_right,_#4e317d,_#0f0523)] border-b-1 border-white px-6 py-4 flex items-center justify-between shadow-sm">
      {/* header-left-side */}
      <div className="flex items-center space-x-4">
       

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Cable className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              VectorShift Assignment
            </h1>
          </div>
        </div>
      </div>
      {/* header-right-side */}
      <div className="flex items-center space-x-3">
      <SubmitButton/>
        <button
          onClick={onClearCanvas}
          className="flex items-center space-x-2 px-4 py-2 text-white bg-gray-600 hover:text-red-700 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>
    </header>
  );
};

export default PipelineHeader;
