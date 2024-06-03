const DeploymentLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return ( 
        <div className="pt-20 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto" >
            <div className="flex gap-x-7" >
                {children}
            </div>     
        </div>
    );
}
 
export default DeploymentLayout;