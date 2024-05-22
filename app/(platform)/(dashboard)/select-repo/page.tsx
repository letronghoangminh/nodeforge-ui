"use client";

import ListRepo from "./_components/list-repo";

const SelectRepoPage = () => {

    

    return ( 
        <div className="flex-col w-full h-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex justify-center flex-col items-center" >
              <div className=" font-bold text-2xl" >
                  Create a new Web Service
              </div>
              <p className=" font-light text-xs" >Connect a Git repository, or use an existing image.</p>
          </div>
          <ListRepo/>
        </div>
      </div>
    );
}
 
export default SelectRepoPage;