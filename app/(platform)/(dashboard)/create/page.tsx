"use server";

import { ListSelect } from "./_components/list-select";

const DashBardPage = async () => {
  return (
    <div className="flex-col w-full h-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex justify-center flex-col items-center" >
            <div className=" font-bold text-2xl" >
                Create a new Web Service
            </div>
            <p className=" font-light text-xs" >Connect a Git repository, or use an existing image.</p>
        </div>
        <div className="flex flex-col" >
            <div className=" font-bold text-xl" >
                How would you like to deploy your web service?
            </div>
            <ListSelect/>
        </div>
      </div>
    </div>
  );
};

export default DashBardPage;
