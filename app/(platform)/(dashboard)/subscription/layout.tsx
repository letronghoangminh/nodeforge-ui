const SubscriptionLayout = ({
    children
}:{children: React.ReactNode}) => {
    return (
        <main className="pt-20 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto" >
            <div className="flex gap-x-7 pt-11" >
                {children}
            </div>     
        </main>
    )
}

export default SubscriptionLayout;