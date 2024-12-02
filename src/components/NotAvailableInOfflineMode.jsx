
const NotAvailableInOfflineMode = ({serviceName}) => {
    return (
        <div className="mt-10">
            <h3 className={"font-bold text-3xl"}>Not available in Offline Mode</h3>
            <h6>To enable {serviceName} connect application to the web.</h6>
        </div>
    )
}

export default NotAvailableInOfflineMode