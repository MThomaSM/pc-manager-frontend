import {BiEdit, BiSolidRightArrow, BiTrash} from "react-icons/bi";

const DemoPage = () => {
  return (
      <div className="flex flex-col items-center justify-center pt-12 md:pt-0 px-3 md:px-0">
          <div className="flex flex-col items-center justify-center space-y-2 py-12 md:pt-6 px-3 md:px-0 container">
              <h2 className="font-normal text-4xl">Startlist of <span className="text-red-600 font-semibold">&apos;Jednotka&apos;</span></h2>
              <p className="text-normal font-light">The list below contains all the PCs that are scheduled to be turned on.</p>
              <div className="container flex-col justify-center items-center space-y-4">
                  <div className={"h-14 max-h-fit flex flex-row mb-3 justify-between items-stretch bg-gradient-to-r shadow-xl  overflow-clip from-orange-400 to-orange-600 text-white text-lg uppercase rounded-full"}>
                      <div className="flex flex-row justify-evenly items-stretch text-base">
                          <p className="font-bold bg-orange-800 items-center justify-center w-fit px-5 -skew-x-[24deg] py-4 pl-6 -ml-1 hidden lg:inline-flex"><span className={"skew-x-[24deg]"}>Planned</span></p>
                          <p className="font-bold bg-orange-600 inline-flex items-center justify-center w-fit pl-8 md:px-5 -skew-x-[24deg] py-4 -ml-1"><span className={"skew-x-[24deg]"}>Hlavny pc deges</span></p>
                          <p className="font-bold bg-orange-400 items-center justify-center w-fit px-5 -skew-x-[24deg] py-4 -ml-1 hidden lg:inline-flex"><span className={"skew-x-[24deg] font-mono text-red-50"}>18:C0:4D:AB:2E:96</span></p>
                          <p className="font-bold bg-transparent inline-flex items-center justify-center w-fit pl-8 md:px-5 -skew-x-[24deg] py-4 -ml-1"><span className={"skew-x-[24deg]"}>27. 04. 2023 14:30</span></p>
                      </div>
                      <div className="flex flex-row justify-evenly items-stretch text-xl -mr-1">
                          <p className="font-bold bg-red-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] pr-1 hover:scale-150 hover:pr-3 transition-all hover:cursor-pointer"><BiTrash className={"skew-x-[24deg]"}/></p>
                      </div>
                  </div>
                  <div className={"h-14 max-h-fit flex flex-row mb-3 justify-between items-stretch bg-gradient-to-r shadow-xl  overflow-clip from-green-400 to-green-600 text-white text-lg uppercase rounded-full"}>
                      <div className="flex flex-row justify-evenly items-stretch text-base">
                          <p className="font-bold bg-green-800 items-center justify-center w-fit px-5 -skew-x-[24deg] py-4 pl-6 -ml-1 hidden lg:inline-flex"><span className={"skew-x-[24deg]"}>Started</span></p>
                          <p className="font-bold bg-green-600 inline-flex items-center justify-center w-fit pl-8 md:px-5 -skew-x-[24deg] py-4 -ml-1"><span className={"skew-x-[24deg]"}>Hlavny pc deges</span></p>
                          <p className="font-bold bg-green-400 items-center justify-center w-fit px-5 -skew-x-[24deg] py-4 -ml-1 hidden lg:inline-flex"><span className={"skew-x-[24deg] font-mono text-red-50"}>18:C0:4D:AB:2E:96</span></p>
                          <p className="font-bold bg-transparent inline-flex items-center justify-center w-fit pl-8 md:px-5 -skew-x-[24deg] py-4 -ml-1"><span className={"skew-x-[24deg]"}>27. 04. 2023 14:30</span></p>
                      </div>
                      <div className="flex flex-row justify-evenly items-stretch text-xl -mr-1">
                          <p className="font-bold bg-red-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] pr-1 hover:scale-150 hover:pr-3 transition-all hover:cursor-pointer"><BiTrash className={"skew-x-[24deg]"}/></p>
                      </div>
                  </div>
              </div>

              <h2 className="font-normal text-4xl pt-6">Detailed setup</h2>
              <div className="container flex-col justify-center items-center space-y-4">
                  <div className={"h-14 max-h-fit flex flex-row justify-between items-stretch bg-gradient-to-r shadow-xl  overflow-clip from-blue-400 to-blue-600 text-white text-lg uppercase rounded-full"}>
                      <div className="flex flex-row justify-evenly items-stretch text-base">
                          <p className="font-bold bg-blue-800 inline-flex items-center justify-center w-fit pl-8 md:px-5 -skew-x-[24deg] py-4 -ml-1"><span className={"skew-x-[24deg]"}>Hlavny pc deges</span></p>
                          <p className="font-bold bg-blue-600 items-center justify-center w-fit px-5 -skew-x-[24deg] py-4 -ml-1 hidden lg:inline-flex"><span className={"skew-x-[24deg] font-mono text-red-50"}>18:C0:4D:AB:2E:96</span></p>
                          <p className="font-bold bg-transparent inline-flex items-center justify-center w-fit pl-8 md:px-5 -skew-x-[24deg] py-4 -ml-1">
                              <input className="form-control form-control-sm skew-x-[24deg] focus:outline-none bg-blue-800 rounded-full px-2" type="datetime-local" name="time_1" min="2023-11-14T13:04"/>
                          </p>
                      </div>
                      <div className="flex flex-row justify-evenly items-stretch text-xl -mr-1">
                          <p className="font-bold bg-blue-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] hover:scale-150 hover:pr-2 transition-all hover:cursor-pointer"><BiEdit className={"skew-x-[24deg]"}/></p>
                          <p className="font-bold bg-red-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] pr-1 hover:scale-150 hover:pr-2 transition-all hover:cursor-pointer"><BiTrash className={"skew-x-[24deg]"}/></p>
                          <p className="font-bold bg-green-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] pr-1 hover:scale-150 hover:pr-3 transition-all hover:cursor-pointer"><BiSolidRightArrow className={"skew-x-[24deg]"}/></p>

                      </div>
                  </div>
              </div>


              <h2 className="font-normal text-4xl pt-6">Detailed setup</h2>


              <div className="flex-col justify-center items-center space-y-4 w-full bg-gradient-to-b from-gray-400 to-gray-200 rounded-lg pb-4">
                  <div className={"flex flex-row justify-between items-stretch bg-gradient-to-r shadow-xl overflow-clip  from-blue-400 to-blue-600 text-white text-lg uppercase rounded-t-lg border-b-[6px] border-blue-950"}>
                      <div className="flex flex-row justify-evenly items-stretch text-base">
                          <p className="font-bold bg-blue-800 inline-flex items-center justify-center w-fit md:px-8 -skew-x-[24deg] py-4 -ml-3"><span className={"skew-x-[24deg]"}>PC NAME</span></p>
                          <p className="font-bold bg-blue-600 items-center justify-center px-8 -skew-x-[24deg] py-4 -ml-1 hidden lg:inline-flex"><span className={"skew-x-[24deg] font-mono text-red-50"}>MAC ADDRESS</span></p>
                          <p className="font-bold bg-transparent inline-flex items-center justify-center w-fit pl-8 md:px-5 -skew-x-[24deg] py-4 -ml-1"><span className={"skew-x-[24deg] font-mono text-red-50"}>DATE OF EXECUTION</span></p>
                      </div>
                      <div className="flex flex-row justify-evenly items-stretch text-xl -mr-4">
                          <p className="font-bold bg-blue-950 inline-flex items-center justify-center w-fit md:px-14 -skew-x-[24deg] py-4"><span className={"skew-x-[24deg]"}>ACTIONS</span></p>
                      </div>
                  </div>
                  <div className={"h-14 max-h-fit flex flex-row justify-between items-stretch bg-gradient-to-r shadow-xl overflow-clip from-blue-400 to-blue-600 text-white text-lg uppercase rounded-full"}>
                      <div className="flex flex-row justify-evenly items-stretch text-base">
                          <p className="font-bold bg-blue-800 inline-flex items-center justify-center w-fit pl-8 md:px-5 -skew-x-[24deg] py-4 -ml-1"><span className={"skew-x-[24deg]"}>Hlavny pc deges</span></p>
                          <p className="font-bold bg-blue-600 items-center justify-center w-fit px-5 -skew-x-[24deg] py-4 -ml-1 hidden lg:inline-flex"><span className={"skew-x-[24deg] font-mono text-red-50"}>18:C0:4D:AB:2E:96</span></p>
                          <p className="font-bold bg-transparent inline-flex items-center justify-center w-fit pl-8 md:px-5 -skew-x-[24deg] py-4 -ml-1">
                              <input className="form-control form-control-sm skew-x-[24deg] focus:outline-none bg-blue-800 rounded-full px-2" type="datetime-local" name="time_1" min="2023-11-14T13:04"/>
                          </p>
                      </div>
                      <div className="flex flex-row justify-evenly items-stretch text-xl -mr-1">
                          <p className="font-bold bg-blue-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] hover:scale-150 hover:pr-2 transition-all hover:cursor-pointer"><BiEdit className={"skew-x-[24deg]"}/></p>
                          <p className="font-bold bg-red-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] pr-1 hover:scale-150 hover:pr-2 transition-all hover:cursor-pointer"><BiTrash className={"skew-x-[24deg]"}/></p>
                          <p className="font-bold bg-green-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] pr-1.5 hover:scale-150 hover:pr-3 transition-all hover:cursor-pointer"><BiSolidRightArrow className={"skew-x-[24deg]"}/></p>
                      </div>
                  </div>
              </div>

              <div className="w-full bg-gradient-to-b from-gray-400 to-gray-200 rounded-lg">

                  <div className="h-14 flex flex-row justify-between items-stretch bg-gradient-to-r from-blue-600 to-blue-800 overflow-clip text-white text-lg uppercase rounded-t-lg border-b-[6px] border-blue-950">
                      <div className="flex flex-row justify-evenly items-stretch font-bold -ml-3">
                          <p className="bg-blue-800 inline-flex items-center justify-center w-72 min-w-fit md:px-8 skew-x-[24deg]"><span className={"-skew-x-[24deg]"}>PC NAME</span></p>
                          <p className="bg-blue-600 inline-flex items-center justify-center w-72 min-w-fit md:px-8 skew-x-[24deg]"><span className={"-skew-x-[24deg]"}>PC MAC ADDRESS</span></p>
                          <p className="bg-blue-400 inline-flex items-center justify-center w-72 min-w-fit md:px-8 skew-x-[24deg]"><span className={"-skew-x-[24deg]"}>DATE OF EXECUTION</span></p>
                      </div>
                      <div className="flex flex-row justify-evenly items-stretch font-bold -mr-3">
                          <p className="bg-blue-950 inline-flex items-center justify-center w-48 min-w-fit md:px-8 skew-x-[24deg]"><span className={"-skew-x-[24deg]"}>ACTIONS</span></p>
                      </div>
                  </div>

                  <div className="h-14 flex flex-row justify-between items-stretch bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-x-[1.01] transition-all hover:rounded-lg overflow-clip text-white text-lg uppercase font-light">
                      <div className="flex flex-row justify-evenly items-stretch -ml-3">
                          <p className="bg-blue-800 inline-flex items-center justify-center w-72 min-w-fit md:px-8 -skew-x-[24deg]"><span className={"skew-x-[24deg]"}>HLAVNY PC DEGES</span></p>
                          <p className="bg-blue-600 inline-flex items-center justify-center w-72 min-w-fit md:px-8 -skew-x-[24deg]"><span className={"skew-x-[24deg] font-mono text-red-50"}>18:C0:4D:AB:2E:96</span></p>
                          <p className="bg-blue-400 inline-flex items-center justify-center w-72 min-w-fit md:px-8 -skew-x-[24deg]">
                              <input className="form-control form-control-sm skew-x-[24deg] focus:outline-none bg-blue-800 rounded-full px-2" type="datetime-local" name="time_1" min="2023-11-14T13:04"/>
                          </p>
                      </div>
                      <div className="flex flex-row justify-evenly items-stretch -mr-3">
                          <p className="bg-blue-700 inline-flex items-center justify-center w-16 min-w-fit -skew-x-[24deg] hover:pr-2 hover:scale-150 hover:cursor-pointer transition-all"><BiEdit className={"skew-x-[24deg]"}/></p>
                          <p className="bg-red-700 inline-flex items-center justify-center w-16 min-w-fit -skew-x-[24deg] hover:pr-2 hover:scale-150 hover:cursor-pointer transition-all"><BiTrash className={"skew-x-[24deg]"}/></p>
                          <p className="bg-green-700 inline-flex items-center justify-center w-16 min-w-fit -skew-x-[24deg] pr-2.5 hover:pr-4 hover:scale-150 hover:cursor-pointer transition-all"><BiSolidRightArrow className={"skew-x-[24deg]"}/></p>
                      </div>
                  </div>

                  <div className="h-14 flex flex-row justify-between items-stretch bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-x-[1.01] transition-all hover:rounded-lg overflow-clip text-white text-lg uppercase rounded-b-lg font-light">
                      <div className="flex flex-row justify-evenly items-stretch -ml-3">
                          <p className="bg-blue-800 inline-flex items-center justify-center w-72 min-w-fit md:px-8 skew-x-[24deg]"><span className={"-skew-x-[24deg]"}>HLAVNY PC DEGES</span></p>
                          <p className="bg-blue-600 inline-flex items-center justify-center w-72 min-w-fit md:px-8 skew-x-[24deg]"><span className={"-skew-x-[24deg] font-mono text-red-50"}>18:C0:4D:AB:2E:96</span></p>
                          <p className="bg-blue-400 inline-flex items-center justify-center w-72 min-w-fit md:px-8 skew-x-[24deg]">
                              <input className="form-control form-control-sm -skew-x-[24deg] focus:outline-none bg-blue-800 rounded-full px-2" type="datetime-local" name="time_1" min="2023-11-14T13:04"/>
                          </p>
                      </div>
                      <div className="flex flex-row justify-evenly items-stretch -mr-3">
                          <p className="bg-blue-700 inline-flex items-center justify-center w-16 min-w-fit skew-x-[24deg] hover:pr-2 hover:scale-150 hover:cursor-pointer transition-all"><BiEdit className={"-skew-x-[24deg]"}/></p>
                          <p className="bg-red-700 inline-flex items-center justify-center w-16 min-w-fit skew-x-[24deg] hover:pr-2 hover:scale-150 hover:cursor-pointer transition-all"><BiTrash className={"-skew-x-[24deg]"}/></p>
                          <p className="bg-green-700 inline-flex items-center justify-center w-16 min-w-fit skew-x-[24deg] pr-2.5 hover:pr-4 hover:scale-150 hover:cursor-pointer transition-all"><BiSolidRightArrow className={"-skew-x-[24deg]"}/></p>
                      </div>
                  </div>


              </div>


              <div className="w-full bg-gradient-to-b from-gray-400 to-gray-200 rounded-lg">

                  <div className="h-14 flex flex-row justify-between items-stretch bg-gradient-to-r from-blue-600 to-blue-800 overflow-clip text-white text-lg uppercase rounded-t-lg border-b-[6px] border-blue-950">
                      <div className="flex flex-row justify-evenly items-stretch font-bold -ml-3">
                          <p className="bg-blue-900 inline-flex items-center justify-center w-72 min-w-fit md:px-8"><span>PC NAME</span></p>
                          <p className="bg-blue-800 inline-flex items-center justify-center w-72 min-w-fit md:px-8"><span>PC MAC ADDRESS</span></p>
                          <p className="bg-blue-600 inline-flex items-center justify-center w-72 min-w-fit md:px-8"><span>DATE OF EXECUTION</span></p>
                      </div>
                      <div className="flex flex-row justify-evenly items-stretch font-bold -mr-3">
                          <p className="bg-blue-950 inline-flex items-center justify-center w-48 min-w-fit md:px-8"><span>ACTIONS</span></p>
                      </div>
                  </div>

                  <div className="h-14 flex flex-row justify-between items-stretch bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-x-[1.01] transition-all hover:rounded-lg overflow-clip text-white text-lg uppercase rounded-b-lg font-light">
                      <div className="flex flex-row justify-evenly items-stretch -ml-3">
                          <p className="bg-blue-800 inline-flex items-center justify-center w-72 min-w-fit md:px-8"><span className={""}>HLAVNY PC DEGES</span></p>
                          <p className="bg-blue-600 inline-flex items-center justify-center w-72 min-w-fit md:px-8"><span className={" font-mono text-red-50"}>18:C0:4D:AB:2E:96</span></p>
                          <p className="bg-blue-400 inline-flex items-center justify-center w-72 min-w-fit md:px-8">
                              <input className="form-control form-control-sm focus:outline-none bg-blue-800 rounded-full px-2" type="datetime-local" name="time_1" min="2023-11-14T13:04"/>
                          </p>
                      </div>
                      <div className="flex flex-row justify-evenly items-stretch -mr-3">
                          <p className="bg-blue-700 inline-flex items-center justify-center w-16 min-w-fit hover:scale-125 hover:cursor-pointer transition-all"><BiEdit className={""}/></p>
                          <p className="bg-red-700 inline-flex items-center justify-center w-16 min-w-fit hover:scale-125 hover:cursor-pointer transition-all"><BiTrash className={""}/></p>
                          <p className="bg-green-700 inline-flex items-center justify-center w-16 min-w-fit pr-2.5 hover:scale-125 hover:cursor-pointer transition-all"><BiSolidRightArrow className={""}/></p>
                      </div>
                  </div>

                  <div className="h-14 flex flex-row justify-between items-stretch bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-x-[1.01] transition-all hover:rounded-lg overflow-clip text-white text-lg uppercase rounded-b-lg font-light">
                      <div className="flex flex-row justify-evenly items-stretch -ml-3">
                          <p className="bg-blue-800 inline-flex items-center justify-center w-72 min-w-fit md:px-8"><span className={""}>HLAVNY PC DEGES</span></p>
                          <p className="bg-blue-600 inline-flex items-center justify-center w-72 min-w-fit md:px-8"><span className={" font-mono text-red-50"}>18:C0:4D:AB:2E:96</span></p>
                          <p className="bg-blue-400 inline-flex items-center justify-center w-72 min-w-fit md:px-8">
                              <input className="form-control form-control-sm focus:outline-none bg-blue-800 rounded-full px-2" type="datetime-local" name="time_1" min="2023-11-14T13:04"/>
                          </p>
                      </div>
                      <div className="flex flex-row justify-evenly items-stretch -mr-3">
                          <p className="bg-blue-700 inline-flex items-center justify-center w-16 min-w-fit hover:scale-125 hover:cursor-pointer transition-all"><BiEdit className={""}/></p>
                          <p className="bg-red-700 inline-flex items-center justify-center w-16 min-w-fit hover:scale-125 hover:cursor-pointer transition-all"><BiTrash className={""}/></p>
                          <p className="bg-green-700 inline-flex items-center justify-center w-16 min-w-fit pr-2.5 hover:scale-125 hover:cursor-pointer transition-all"><BiSolidRightArrow className={""}/></p>
                      </div>
                  </div>


              </div>

              <table className="table-auto border-separate border-spacing-x-1 border-spacing-y-1.5 w-full rounded-lg">
                  <thead>
                  <tr className="bg-blue-600 font-medium text-white rounded-lg hover:scale-x-[1.01] transition-all">
                      <th className="border p-2 border-blue-400 rounded-lg"><input type="checkbox"/></th>
                      <th className="border p-2 border-blue-400 rounded-lg">PC Name</th>
                      <th className="border p-2 border-blue-400 rounded-lg">MAC Address</th>
                      <th className="border p-2 border-blue-400 rounded-lg max-w-max">Date of execution</th>
                      <th className="border p-2 border-blue-400 rounded-lg">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr className="bg-blue-300 text-black text-center  rounded-lg  hover:scale-x-[1.01] transition-all">
                      <td className="p-1 rounded-lg"><input type="checkbox"/></td>
                      <td className="p-1 rounded-lg">Hlavny PC degeš</td>
                      <td className="p-1 rounded-lg">18:C0:4D:AB:2E:96</td>
                      <td className="rounded-lg w-max"><input className="m-2 focus:outline-none bg-blue-400 rounded-lg py-1 px-2" type="datetime-local" name="time_1" min="2023-11-14T13:04"/></td>
                      <td className="p-1 rounded-lg">
                          <div className="flex items-center justify-center gap-x-1.5 text-white">
                              <BiEdit className="bg-blue-700 text-4xl p-1 hover:scale-110 rounded-lg transition-all"/>
                              <BiTrash className="bg-red-700 text-4xl p-1 hover:scale-110 rounded-lg transition-all" />
                              <BiSolidRightArrow className="bg-green-700 text-4xl p-1 hover:scale-110 rounded-lg transition-all" />
                          </div>
                      </td>
                  </tr>

                  <tr className="bg-green-300 text-black text-center  rounded-lg  hover:scale-x-[1.01] transition-all">
                      <td className="p-1 rounded-lg"><input type="checkbox" checked={true}/></td>
                      <td className="p-1 rounded-lg">Hlavny PC degeš</td>
                      <td className="p-1 rounded-lg">18:C0:4D:AB:2E:96</td>
                      <td className="rounded-lg w-max"><input className="m-2 focus:outline-none bg-blue-400 rounded-lg py-1 px-2" type="datetime-local" name="time_1" min="2023-11-14T13:04"/></td>
                      <td className="p-1 rounded-lg">
                          <div className="flex items-center justify-center gap-x-1.5 text-white">
                              <BiEdit className="bg-blue-700 text-4xl p-1 hover:scale-110 rounded-lg transition-all"/>
                              <BiTrash className="bg-red-700 text-4xl p-1 hover:scale-110 rounded-lg transition-all" />
                              <BiSolidRightArrow className="bg-green-700 text-4xl p-1 hover:scale-110 rounded-lg transition-all" />
                          </div>
                      </td>
                  </tr>
                  </tbody>
              </table>

          </div>
      </div>
  )
}

export default DemoPage;